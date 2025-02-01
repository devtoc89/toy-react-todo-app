import { parseTodoModelToViewModel } from '#/queries/todo/todo.parser'
import { getTodoListItemKey } from '#/queries/todo/todo.query.key'
import { APIResponse } from '#/types/model/common/common.respose.model'
import { ToDoModel } from '#/types/model/todo/todo.model'
import { ToDoViewModel } from '#/types/view-model/todo.view.model'
import { useQuery } from '@tanstack/react-query'

/**
 * ReactQuery todo item 취득 처리
 */
async function queryFn(id: number): Promise<ToDoModel> {
  const res = await fetch(`/api/todos/${id}`)
  const data = (await res.json()) as APIResponse<ToDoModel | undefined>
  if (data.code !== 200 || !data.data) throw new Error('fail to process data.')
  return data.data
}

function select(todo?: ToDoModel): ToDoViewModel | undefined {
  return todo && parseTodoModelToViewModel(todo)
}

function useGetTodoQuery(id: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: getTodoListItemKey(id),
    staleTime: 60000,
    queryFn: () => queryFn(id),
    select,
  })
  return { data, isLoading, isError }
}

export default useGetTodoQuery
