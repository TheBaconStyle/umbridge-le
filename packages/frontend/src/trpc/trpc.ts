import { AppRouter } from "@server/app/app.service"
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client"
import SuperJSON from "superjson"

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.API_URL}/trpc`,
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          cache: init?.method === "POST" ? "no-store" : "default",
        }),
    }),
  ],
  transformer: SuperJSON,
})
