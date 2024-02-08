import { Footer, Header, PageTransitionProvider } from "@web/components"
import { PropsWithChildren } from "react"

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <PageTransitionProvider>{children}</PageTransitionProvider>
      <Footer />
    </>
  )
}
