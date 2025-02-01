import ThemeProvider from '#/components/theme/ThemeProvider'
import GlobalStateExchange from '#/components/ui/GlobalStateExchange'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { ToastContainer } from 'react-toastify'

// 테마, 프로바이더, 토스트 및 전역 상태 관리 등 공통 처리 레이어
const queryClient = new QueryClient()
function CommonLayer({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer />
        </QueryClientProvider>
      </ThemeProvider>
      <GlobalStateExchange />
    </>
  )
}

export default CommonLayer
