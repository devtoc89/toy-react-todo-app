import {
  parseTodoModelToViewModel,
  parseTodoViewModelToRequestModel,
} from '#/queries/todo/todo.parser'
import {
  getTodoListItemKey,
  getTodoListKey,
} from '#/queries/todo/todo.query.key'
import { APIResponse } from '#/types/model/common/common.respose.model'
import { ToDoModel } from '#/types/model/todo/todo.model'
import { ToDoViewModel } from '#/types/view-model/todo.view.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * ReactQuery todo item 갱신 처리
 */
async function mutationFn(todo: ToDoViewModel) {
  const res = await fetch(`/api/todos/${todo.id}`, {
    method: 'put',
    body: JSON.stringify(parseTodoViewModelToRequestModel(todo)),
  })
  const data = (await res.json()) as APIResponse<ToDoModel>
  if (data.code !== 200 || !data.data) throw new Error('fail to process data.')
  return data.data
}

function usePutTodoQuery(keyword: string) {
  const queryClient = useQueryClient()

  const context = useMutation({
    mutationFn,
    onMutate: async (todo) => {
      const oldItemList: Array<ToDoViewModel> = []
      // todo 목록 진행중 쿼리 취소
      await queryClient.cancelQueries({ queryKey: getTodoListKey(keyword) })

      // 수정 대상 todo의 정보를 수정하려는 todo의 정보로 갱신(optimistic)
      queryClient.setQueryData(
        getTodoListItemKey(todo.id),
        parseTodoModelToViewModel({ ...todo })
      )
      return { oldTodo: oldItemList[0] }
    },
    onError: (_error, variables) => {
      // 에러 시, id에 해당하는 정보 재취득
      queryClient.invalidateQueries({
        queryKey: getTodoListItemKey(variables.id),
      })
    },
    onSettled: (data) => {
      // 전송받은 todo로 갱신
      if (data) {
        queryClient.setQueryData(
          getTodoListItemKey(data.id),
          parseTodoModelToViewModel(data)
        )
      }
    },
  })

  return context
}

export default usePutTodoQuery
