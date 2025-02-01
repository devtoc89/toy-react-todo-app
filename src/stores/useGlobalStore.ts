import { IS_MOBILE_MEDIA_CONDITION } from '#/constants/screen.constants'
import { create } from 'zustand'

/**
 * 모바일 여부를 포함한 공통 스테이터스 공유를 위한 스토어 (zustand store)
 */
type GlobalStore = {
  state: GlobalStateStore
  getIsMobile: () => boolean
  setIsMobile: (isMobile: boolean) => void
}

type GlobalStateStore = {
  isMobile: boolean
}

const defulatState: GlobalStateStore = {
  isMobile: !window.matchMedia(IS_MOBILE_MEDIA_CONDITION).matches,
}

const useGlobalStore = create<GlobalStore>((set, get) => ({
  state: { ...defulatState },
  getIsMobile: () => get().state.isMobile,
  setIsMobile: (isMobile) =>
    set((state) => ({ state: { ...state.state, isMobile } })),
}))

export default useGlobalStore
