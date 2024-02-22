"use client"
import { SnackbarProvider } from "notistack"
import { PropsWithChildren } from "react"
import { ComplexNotification, SimpleNotification } from "./Notifications"

export function NotificationProvider({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      Components={{
        complex: ComplexNotification,
        simple: SimpleNotification,
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
