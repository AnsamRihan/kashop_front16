import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18next.jsx'
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";

export default function App() {
  // Create a client
  const queryClient = new QueryClient();
  
  broadcastQueryClient({
      queryClient,
      broadcastChannel: "my-app",
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}
