'use client'

import { useEffect } from "react"
import { AlertCircle, RotateCcw } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error) // log to monitoring
  }, [error])

  return (
    <div className="flex h-screen w-full items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-400/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl animate-pulse delay-200"></div>

      {/* Error Card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center space-y-4 py-8">
          <div className="rounded-2xl bg-red-100 dark:bg-red-900/30 p-4 shadow-md animate-bounce">
            <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-center text-2xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400 max-w-sm">
            We ran into an unexpected issue. Don’t worry, you can try again in a moment.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-5 pb-8">
          <Button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
                       shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                       transition-all duration-300"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>

          {error?.message && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center break-words border-t border-gray-200/40 dark:border-gray-700/40 pt-4 w-full">
              <span className="font-semibold">Details:</span> {error.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
