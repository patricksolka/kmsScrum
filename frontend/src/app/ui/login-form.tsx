/*
'use client';

import Link from 'next/link';

function LoginForm() {
  return (
    <div>
      <form>
        <div className="mb-4">
          <label htmlFor="login-page-email" className="sr-only">
            E-Mail
          </label>
          <input
            type="email"
            id="login-page-email"
            placeholder="E-Mail"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="login-page-password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="login-page-password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Noch kein Konto?{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          Hier registrieren
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); // Prüfen, ob die Funktion überhaupt aufgerufen wird
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      console.log('Response status:', response.status); // Logge den HTTP-Statuscode

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, token:', data.token); // Logge die Erfolgsmeldung
        localStorage.setItem('authToken', data.token);
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.log('Error data:', errorData); // Logge die Fehlermeldung
        setError(errorData.message || 'Login fehlgeschlagen');
      }
    } catch (err) {
      console.error('Error:', err); // Logge den Fehler
      setError('Etwas ist schief gelaufen, bitte versuche es später erneut.');
    } finally {
      setLoading(false);
      console.log('Finished handling submit'); // Logge den Abschluss der Funktion
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="login-page-email" className="sr-only">
            E-Mail
          </label>
          <input
            type="email"
            id="login-page-email"
            placeholder="E-Mail"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="login-page-password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="login-page-password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          disabled={loading}
        >
          {loading ? 'Lädt...' : 'Login'}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <p className="text-center mt-4 text-sm text-gray-600">
        Noch kein Konto?{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          Hier registrieren
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
