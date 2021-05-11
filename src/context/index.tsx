import React, { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "store"
import { AuthProvider } from "./auth-context"
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}