import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  SvgIconComponent,
  WarningAmber,
} from "@mui/icons-material"
import { AlertProps } from "@mui/material"

export const vars: Record<
  Exclude<AlertProps["color"], undefined>,
  SvgIconComponent
> = {
  success: CheckCircleOutline,
  error: ErrorOutline,
  warning: WarningAmber,
  info: InfoOutlined,
}

type TIconVariant = { variant: AlertProps["color"] }

export function IconVariant({ variant }: TIconVariant) {
  const Icon = variant && vars[variant]
  return Icon && <Icon color="inherit" />
}
