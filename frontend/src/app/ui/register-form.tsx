/*
'use client';
import Link from 'next/link';

function RegisterForm() {
  return (
    <div>
      <form id="register-page-form">
        <div className="mb-4">
          <label htmlFor="register-page-firstname" className="sr-only">
            Vorname
          </label>
          <input
            type="text"
            id="register-page-firstname"
            placeholder="Vorname"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-lastname" className="sr-only">
            Nachname
          </label>
          <input
            type="text"
            id="register-page-lastname"
            placeholder="Nachname"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-username" className="sr-only">
            Benutzername
          </label>
          <input
            type="text"
            id="register-page-username"
            placeholder="Benutzername"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-email" className="sr-only">
            E-Mail
          </label>
          <input
            type="email"
            id="register-page-email"
            placeholder="E-Mail"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-password" className="sr-only">
            Passwort
          </label>
          <input
            type="password"
            id="register-page-password"
            placeholder="Passwort"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-confirm-password" className="sr-only">
            Passwort bestätigen
          </label>
          <input
            type="password"
            id="register-page-confirm-password"
            placeholder="Passwort bestätigen"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Registrieren
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Schon ein Konto?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Hier einloggen
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
*/

/*
'use client';
import { useState } from 'react';
import Link from 'next/link';

function RegisterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    try {
      // eslint-disable-next-line no-undef
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password
        })
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Fehler bei der Registrierung');
        setSuccess(false);
      }
    } catch (error) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <form id="register-page-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="register-page-firstname" className="sr-only">
            Vorname
          </label>
          <input
            type="text"
            id="register-page-firstname"
            placeholder="Vorname"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-lastname" className="sr-only">
            Nachname
          </label>
          <input
            type="text"
            id="register-page-lastname"
            placeholder="Nachname"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-username" className="sr-only">
            Benutzername
          </label>
          <input
            type="text"
            id="register-page-username"
            placeholder="Benutzername"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-email" className="sr-only">
            E-Mail
          </label>
          <input
            type="email"
            id="register-page-email"
            placeholder="E-Mail"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-password" className="sr-only">
            Passwort
          </label>
          <input
            type="password"
            id="register-page-password"
            placeholder="Passwort"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-confirm-password" className="sr-only">
            Passwort bestätigen
          </label>
          <input
            type="password"
            id="register-page-confirm-password"
            placeholder="Passwort bestätigen"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">
            Erfolgreich registriert! Du kannst dich jetzt einloggen.
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Registrieren
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Schon ein Konto?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Hier einloggen
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
*/

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function RegisterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Zustand für Ladeindikator
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password
        })
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setIsLoading(true); // Ladeindikator aktivieren

        // Sofortige Weiterleitung nach erfolgreicher Registrierung
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Fehler bei der Registrierung');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Fehler:', error);
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <form id="register-page-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="register-page-firstname" className="sr-only">
            Vorname
          </label>
          <input
            type="text"
            id="register-page-firstname"
            placeholder="Vorname"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-lastname" className="sr-only">
            Nachname
          </label>
          <input
            type="text"
            id="register-page-lastname"
            placeholder="Nachname"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-username" className="sr-only">
            Benutzername
          </label>
          <input
            type="text"
            id="register-page-username"
            placeholder="Benutzername"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-email" className="sr-only">
            E-Mail
          </label>
          <input
            type="email"
            id="register-page-email"
            placeholder="E-Mail"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-password" className="sr-only">
            Passwort
          </label>
          <input
            type="password"
            id="register-page-password"
            placeholder="Passwort"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-page-confirm-password" className="sr-only">
            Passwort bestätigen
          </label>
          <input
            type="password"
            id="register-page-confirm-password"
            placeholder="Passwort bestätigen"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">
            Erfolgreich registriert! Du wirst nun zur Login-Seite
            weitergeleitet.
          </p>
        )}
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-600 rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Weiterleitung...</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Registrieren
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Schon ein Konto?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Hier einloggen
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
