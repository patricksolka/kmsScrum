import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/app/login/page'; // Importiere die Login-Seite

describe('Login Page', () => {
  it('renders a heading', () => {
    render(<Login />);
    const heading = screen.getByRole('heading', { level: 2, name: /Login/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders email and password fields', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('renders a login button', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('allows user to input email and password', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/E-Mail/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
