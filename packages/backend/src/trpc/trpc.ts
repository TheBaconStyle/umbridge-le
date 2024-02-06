import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create()
const publicProcedure = trpc.procedure
const router = trpc.router
const mergeRouters = trpc.mergeRouters

export { publicProcedure, router, mergeRouters }
