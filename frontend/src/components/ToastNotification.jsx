import { Check } from 'lucide-react'

function ToastNotification({ message }) {
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-200 ${
        message ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-forest text-paper text-sm font-medium px-5 py-3 rounded-full shadow-xl flex items-center gap-2">
        <Check className="w-4 h-4" />
        <span>{message}</span>
      </div>
    </div>
  )
}

export default ToastNotification
