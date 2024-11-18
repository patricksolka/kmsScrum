import RegisterForm from '@/app/ui/register-form';

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Registrieren
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
