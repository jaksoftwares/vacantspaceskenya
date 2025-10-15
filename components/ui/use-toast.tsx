"use client"

import * as React from "react"

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void
}>({
  toast: () => {},
})

export function useToast() {
  return React.useContext(ToastContext)
}

export function Toaster({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, props.duration ?? 4000)
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <ToastProvider>
        {children}
        {toasts.map((t, i) => (
          <Toast key={i} variant={t.variant}>
            <div className="grid gap-1">
              {t.title && <ToastTitle>{t.title}</ToastTitle>}
              {t.description && <ToastDescription>{t.description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export const toast = (props: ToastProps) => {
  const ctx = React.useContext(ToastContext)
  ctx.toast(props)
}
