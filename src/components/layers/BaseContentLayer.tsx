import Header from '#/components/ui/Header'
import { AppBar, Stack } from '@mui/material'
import { ReactNode } from 'react'

// 컨텐츠 관련 페이지 공통 레이어
function BaseContentLayer({ children }: { children: ReactNode }) {
  return (
    <Stack flex={1} height="100vh" width="100vw">
      <AppBar
        position="sticky"
        color="primary"
        enableColorOnDark
        sx={{ top: '0' }}
      >
        <Header />
      </AppBar>
      <Stack component={'main'} flexDirection="row" flex={1}>
        {children}
      </Stack>
    </Stack>
  )
}

export default BaseContentLayer
