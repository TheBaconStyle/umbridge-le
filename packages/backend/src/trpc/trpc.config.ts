import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create()
const procedure = trpc.procedure
const router = trpc.router
const mergeRouters = trpc.mergeRouters

export { procedure, router, mergeRouters }
