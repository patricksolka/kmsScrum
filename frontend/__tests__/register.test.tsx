import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from '../src/app/register/page';
import { useRouter } from 'next/navigation';
import { mockFetch } from './helper/mockFetch';

// Mock für 'next/navigation' Modul
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn()
    }
  }))
}));

describe('Register Page', () => {
  it('renders all input fields', () => {
    render(<Register />);

    // Formularfelder rendern
    expect(screen.getByPlaceholderText(/Vorname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nachname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Benutzername/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Passwort bestätigen')
    ).toBeInTheDocument();
  });

  it('submits the form and redirects', async () => {
    const mockPush = jest.fn(); // Mock-Funktion für push

    // useRouter-Funktion mocken
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      events: {
        on: jest.fn(),
        off: jest.fn()
      }
    });
    // Fetch simulieren
    global.fetch = mockFetch({ success: true });

    render(<Register />);

    // Formular ausfüllen
    (screen.getByPlaceholderText(/Vorname/i) as HTMLInputElement).value = 'Max';
    (screen.getByPlaceholderText(/Nachname/i) as HTMLInputElement).value =
      'Mustermann';
    (screen.getByPlaceholderText(/Benutzername/i) as HTMLInputElement).value =
      'max123';
    (screen.getByPlaceholderText(/E-Mail/i) as HTMLInputElement).value =
      'max@mustermann.de';
    (screen.getByPlaceholderText('Passwort') as HTMLInputElement).value =
      'Passwort123';
    (
      screen.getByPlaceholderText('Passwort bestätigen') as HTMLInputElement
    ).value = 'Passwort123';

    // Absenden des Formulars simulieren
    fireEvent.click(screen.getByRole('button', { name: /Registrieren/i }));

    // Warten auf async und sicherstellen, dass der Router-Push abgeschlossen ist
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });

    // verifizieren, dass fetch aufgerufen wurde
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/auth/register',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String)
      })
    );
  });
});
