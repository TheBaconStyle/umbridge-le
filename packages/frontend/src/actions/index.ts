export * from "./setTheme"
export * from "./getPathname"
export * from "./getTheme"
export * from "./createQuestion"

export type TTRPCActionReturn<T> =
  | {
      status: "error"
      data: string[]
    }
  | {
      status: "success"
      data: T
    }
