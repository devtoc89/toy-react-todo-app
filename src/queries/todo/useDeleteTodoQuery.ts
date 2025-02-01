import { getTodoListKey } from '#/queries/todo/todo.query.key'
import { UseGetTodoListInfiniteQueryData } from '#/queries/todo/useGetTodoListInfiniteQuery'
import { APIResponse } from '#/types/model/common/common.respose.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * ReactQuery todo 삭제(many) 처리
 */

// mudation 함수(todo 삭제)
async function mutationFn(idList: Array<number>): Promise<void> {
  const resList = await Promise.all(
    idList.map((id) =>
      fetch(`/api/todos/${id}`, {
        method: 'delete',
      })
    )
  )

  for (const res of resList) {
    const data = (await res.json()) as APIResponse<void>
    if (data.code !== 200 && data.code !== 404)
      throw new Error('fail to delete todo data.')
  }
}

// todo 삭제 쿼리  (삭제 시의 리스트 처리를 위한 keyword 사용)
function useDeleteTodoQuery(keyword: string) {
  const queryClient = useQueryClient()

  const context = useMutation({
    mutationFn,
    onMutate: async (idList) => {
      // todo 리스트 쿼리 처리 중지
      await queryClient.cancelQueries({
        queryKey: getTodoListKey(keyword),
      })
      // 이전 todo 상제 유지
      const previousTodos =
        queryClient.getQueryData<UseGetTodoListInfiniteQueryData>(
          getTodoListKey(keyword)
        )
      // 변경 후 todo 목록(optimistic)
      const optimiticTodos: UseGetTodoListInfiniteQueryData = previousTodos && {
        ...previousTodos,
        pages: previousTodos.pages.map((page) => ({
          ...page,
          list: page.list.filter((item) => !idList.includes(item)),
        })),
      }
      // optimistic 갱신
      queryClient.setQueryData<UseGetTodoListInfiniteQueryData>(
        getTodoListKey(keyword),
        () => optimiticTodos
      )

      return { optimiticTodos }
    },
    onError: () => {
      // 에러 시에는 전체 목록 갱신
      queryClient.invalidateQueries({ queryKey: getTodoListKey(keyword) })
    },
    onSettled: (_data, _err, _variables, context) => {
      // context를 통해 optimistic 정보가 없다면, 쿼리 갱신
      if (!context)
        queryClient.invalidateQueries({ queryKey: getTodoListKey(keyword) })
    },
  })

  return context
}

export default useDeleteTodoQuery
