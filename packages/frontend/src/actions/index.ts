export * from "./theme"
export * from "./url"
export * from "./createQuestion"
export * from "./createUser"

export type TTRPCActionReturn<T> =
  | {
      status: "error"
      data: string[]
    }
  | {
      status: "success"
      data: T
    }
