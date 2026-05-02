import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Masuk</h1>
        <LoginForm />
      </div>
    </div>
  )
}
