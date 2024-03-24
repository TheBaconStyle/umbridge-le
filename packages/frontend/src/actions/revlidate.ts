import { revalidatePath, revalidateTag } from "next/cache"
import { getServerPathname } from "."

export const revalidateTagAction = async (tag: string) => revalidateTag(tag)

export const revalidatePathAction = async (path: string) => revalidatePath(path)

export const revalidateCurrentPath = async () =>
  revalidatePathAction(await getServerPathname())
