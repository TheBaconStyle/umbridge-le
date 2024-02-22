export * from "./crtUsr"
export * from "./setTheme"
export * from "./getPathname"
export * from "./getTheme"
export * from "./crtQuestion"

export type TTRPCActionReturn<T> =
  | {
      status: "error"
      data: string[]
    }
  | {
      status: "success"
      data: T
    }
