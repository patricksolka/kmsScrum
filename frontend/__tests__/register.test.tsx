import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Register from '../src/app/register/page'; // Importiere die Registrierungsseite

describe('Register Page', () => {
  it('renders all input fields', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText(/Vorname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nachname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Benutzername/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Passwort bestätigen')).toBeInTheDocument();
  });
});
