import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion Admin</h1>
          <p className="text-gray-600">Accédez à votre espace d&apos;administration</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
