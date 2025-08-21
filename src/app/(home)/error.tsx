'use client'

import { useEffect } from "react"
import { AlertCircle, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error) // send to monitoring/logging
  }, [error])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <CardHeader className="flex flex-col items-center space-y-3">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            An unexpected error occurred. Please try again.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-4">
          <Button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>

          {error?.message && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center break-words border-t border-gray-200/40 dark:border-gray-700/40 pt-3 w-full">
              <span className="font-semibold">Details:</span> {error.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
