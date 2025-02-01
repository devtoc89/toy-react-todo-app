import { create } from 'zustand'

/**
 * todo 목록/아이템의 상태 관리를 위한 스토어 (zustand store)
 */
export type TodoListStateStore = {
  state: {
    searchKeyword: string
    idList: Array<number>
    isAllChecked: boolean
    statusMap: Map<number, { checked: boolean }>
  }
  // 화면상 idList 동기
  setIdList: (idList: Array<number>) => void
  getIdList: () => Array<number>

  // todo item check 관련
  toggleChecked: (id: number) => void
  getIsChecked: (id: number) => boolean
  getCheckedIdList: () => Array<number>
  resetAllChecked: () => void
  getIsAllChecked: () => boolean
  toggleAllChecked: () => void

  // todo 서치 키워드 관련
  getSearchKeyword: () => string
  setSearchKeyword: (searchKeyword: string) => void
}

function getDefualtValue() {
  return {
    statusMap: new Map(),
    searchKeyword: '',
    isAllChecked: false,
    idList: [],
  }
}

// todo 목록에 관련한 상태를 유지하기 위한 스토어
export function createUseTodoListStateStore() {
  return create<TodoListStateStore>((set, get) => ({
    state: getDefualtValue(),
    getSearchKeyword: () => get().state.searchKeyword,
    setSearchKeyword: (searchKeyword) =>
      set((state) => ({
        state: {
          ...state.state,
          isAllChecked: false,
          statusMap:
            state.state.statusMap.size > 0 ? new Map() : state.state.statusMap,
          searchKeyword,
        },
      })),
    setIdList: (idList) =>
      set((state) => ({ state: { ...state.state, idList } })),
    getIdList: () => get().state.idList,
    getIsChecked: (id) => !!get().state.statusMap.get(id)?.checked,
    toggleChecked: (id) => {
      const state = { ...get().state }
      state.statusMap.set(id, { checked: !state.statusMap.get(id)?.checked })
      set({ state })
    },
    resetAllChecked: () =>
      set((state) => ({
        state: { ...state.state, statusMap: new Map(), isAllChecked: false },
      })),
    getCheckedIdList: () => {
      const state = get()
      const checkedList = [...state.state.statusMap.entries()]
        .filter((v) => v[1].checked)
        .map((v) => v[0])

      if (state.state.isAllChecked) {
        return state.state.idList.filter((v) => !checkedList.includes(v))
      }
      return checkedList
    },
    getIsAllChecked: () => get().state.isAllChecked,
    toggleAllChecked: () =>
      set((state) => ({
        state: {
          ...state.state,
          statusMap: new Map(),
          isAllChecked: !state.state.isAllChecked,
        },
      })),
  }))
}

export default createUseTodoListStateStore()
