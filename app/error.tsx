'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-emerald-500 border-none hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg rounded-md"
          >
            Try Again
          </button>
          
          <div className="text-sm text-gray-500">
            <a href="/" className="text-green-600 hover:text-green-700 underline">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}