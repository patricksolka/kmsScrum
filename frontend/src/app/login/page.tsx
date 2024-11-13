import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
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
    </div>
  );
}
