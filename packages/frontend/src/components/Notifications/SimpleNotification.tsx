"use client"
import { Alert } from "@mui/material"
import { ReactNode, forwardRef } from "react"
import { NotificationProps } from "."
import { IconVariant } from "./IconVariant"

export type TSimpleNotification = NotificationProps & {
  message: string
  action?: ReactNode
}

export const SimpleNotification = forwardRef<
  HTMLDivElement,
  TSimpleNotification
>(function SimpleNotification(
  { message, action, color, appearance = "filled" },
  ref,
) {
  return (
    <Alert
      ref={ref}
      variant={appearance}
      color={color}
      action={action}
      icon={<IconVariant variant={color} />}
    >
      {message}
    </Alert>
  )
})
