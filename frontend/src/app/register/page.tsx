import Link from 'next/link';

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Registrieren
        </h2>
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
    </div>
  );
}
