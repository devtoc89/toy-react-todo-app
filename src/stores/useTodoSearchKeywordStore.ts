import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/**
 * todo 조회 키워드를 유지하기 위한 스토어 (zustand store)
 */
export type TodoListStateStore = {
  state: Array<string>
  setHistory: (searchKeyword: string) => void
  getHistory: () => Array<string>
}

const useTodoSearchKeywordStore = create(
  persist<TodoListStateStore>(
    (set, get) => ({
      state: [],
      setHistory: (searchKeyword) => {
        if (searchKeyword) {
          set((state) => ({
            // 히스토리는 10개로 제한
            state: [...new Set([searchKeyword, ...state.state])].slice(0, 10),
          }))
        }
      },
      getHistory: () => get().state,
    }),
    {
      name: 'todokeyword',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useTodoSearchKeywordStore
