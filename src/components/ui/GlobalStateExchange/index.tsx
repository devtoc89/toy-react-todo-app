import { IS_MOBILE_MEDIA_CONDITION } from '#/constants/screen.constants'
import useGlobalStore from '#/stores/useGlobalStore'
import { useMediaQuery } from '@mui/material'
import { useEffect } from 'react'

/**
 * 전역 상태 관리 컴포넌트 부품
 * 1. 모바일 여부 관리
 */
function ExchangeIsMobileToStore() {
  const setIsMobile = useGlobalStore((s) => s.setIsMobile)
  const isMobile = !useMediaQuery(IS_MOBILE_MEDIA_CONDITION)
  useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile, setIsMobile])
  return <></>
}

function GlobalStateExchange() {
  return (
    <>
      <ExchangeIsMobileToStore />
    </>
  )
}

export default GlobalStateExchange
