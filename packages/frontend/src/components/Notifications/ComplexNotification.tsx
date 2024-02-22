import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@mui/material"
import { motion } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import { useBoolean } from "usehooks-ts"
import { NotificationProps } from "."
import { IconVariant } from "./IconVariant"

export type TComplexNotification = NotificationProps & {
  title: string
  expandedContent?: ReactNode
}

export const ComplexNotification = forwardRef<
  HTMLDivElement,
  TComplexNotification
>(function ComplexNotification(
  { title, expandedContent, color, appearance = "filled" },
  ref,
) {
  const { value: isExpanded, toggle: toggleExpand } = useBoolean(false)
  const ActionIcon = isExpanded ? ExpandLess : ExpandMore
  return (
    <Paper ref={ref}>
      <Alert
        component={motion.div}
        variant={appearance}
        color={color}
        icon={<IconVariant variant={color} />}
        action={
          <IconButton
            color="inherit"
            sx={{ fontSize: "inherit" }}
            onClick={toggleExpand}
          >
            <ActionIcon />
          </IconButton>
        }
        sx={{
          borderBottomLeftRadius: isExpanded ? 0 : undefined,
          borderBottomRightRadius: isExpanded ? 0 : undefined,
          alignItems: "center",
        }}
      >
        <Typography>{title}</Typography>
      </Alert>
      <Collapse in={isExpanded}>
        <Box sx={{ px: 1, py: 0.375 }}>{expandedContent}</Box>
      </Collapse>
    </Paper>
  )
})
