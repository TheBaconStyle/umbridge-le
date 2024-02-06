"use client"
import { getInitColorSchemeScript } from "@mui/material"
import Head from "next/head"

export function InitialColorSchemeScript() {
  return <Head>{getInitColorSchemeScript()}</Head>
}
