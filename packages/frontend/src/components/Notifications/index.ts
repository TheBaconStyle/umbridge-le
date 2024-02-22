import { AlertProps } from "@mui/material"
import {
  ComplexNotification,
  TComplexNotification,
} from "./ComplexNotification"
import { TSimpleNotification, SimpleNotification } from "./SimpleNotification"

export type NotificationProps = {
  color?: AlertProps["color"]
  appearance?: AlertProps["variant"]
}

declare module "notistack" {
  interface VariantOverrides {
    complex: TComplexNotification
    simple: TSimpleNotification
    success: false
    default: false
    warning: false
    error: false
    info: false
  }
}

export { SimpleNotification, type TSimpleNotification }

export { ComplexNotification, type TComplexNotification }
