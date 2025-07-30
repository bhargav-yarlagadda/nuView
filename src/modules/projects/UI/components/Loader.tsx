

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center h-full bg-gradient-to-br backdrop-blur-lg bg-transparent">
      <div className="flex space-x-5">
        <span className="w-6 h-6 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-6 h-6 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-6 h-6 rounded-full bg-blue-400 animate-bounce"></span>
      </div>
    </div>
  )
}
