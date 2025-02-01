import { TodoListStateStore } from '#/stores/useTodoListStateStore'
import { createContext } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'

// TodoListStateStore의 컨텍스트 키
export const TodoListStateStoreContext = createContext<UseBoundStore<
  StoreApi<TodoListStateStore>
> | null>(null)
