import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-emerald-500 border-none hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg rounded-md"
          >
            Return Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link href="/login" className="text-green-600 hover:text-green-700 underline">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}