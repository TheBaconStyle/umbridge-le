import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'

const trpc = initTRPC.create({ transformer: SuperJSON })
const publicProcedure = trpc.procedure
const router = trpc.router
const mergeRouters = trpc.mergeRouters

export { publicProcedure, router, mergeRouters }
