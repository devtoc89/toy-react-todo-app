import Logo from '#/components/ui/Header/Logo'
import useGlobalStore from '#/stores/useGlobalStore'
import { Stack } from '@mui/material'

/**
 * 헤더 컴포넌트
 */
function Header() {
  const isMobile = useGlobalStore((s) => s.state.isMobile)
  return (
    <Stack flexDirection="row">
      <Stack
        px={1}
        py={0.5}
        alignItems={isMobile ? 'center' : 'flex-start'}
        flex={1}
      >
        <Logo />
      </Stack>
    </Stack>
  )
}

export default Header
