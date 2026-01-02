import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import { Provider } from 'inversify-react';
import { container } from "./ioc";

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export const Providers = ({ children }: Props) => {
  return (
    <Provider container={container}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider >
    </Provider>
  )
}