"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export function PageTransitionProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        key={pathname}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
