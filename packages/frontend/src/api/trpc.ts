import { AppRouter } from "@server/app/app.service"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.API_URL}/trpc`,
    }),
  ],
})
