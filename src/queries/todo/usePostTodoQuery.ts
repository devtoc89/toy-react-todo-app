import { parseTodoModelToViewModel } from '#/queries/todo/todo.parser'
import {
  getTodoListItemKey,
  getTodoListKey,
} from '#/queries/todo/todo.query.key'
import { UseGetTodoListInfiniteQueryData } from '#/queries/todo/useGetTodoListInfiniteQuery'
import { APIResponse } from '#/types/model/common/common.respose.model'
import { ToDoRequest } from '#/types/model/todo/todo.if.model'
import { ToDoModel } from '#/types/model/todo/todo.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * ReactQuery todo 등록 처리
 */
async function mutationFn(newTodo: ToDoRequest) {
  const res = await fetch('/api/todos', {
    method: 'post',
    body: JSON.stringify(newTodo),
  })
  const data = (await res.json()) as APIResponse<ToDoModel>
  if (data.code !== 200 || !data.data) throw new Error('fail to process data.')
  return data.data
}

// optimistic하게 추가되는 ToDo에 대한 임시 ID 부여 처리

const temporalIdMaker = (() => {
  let temporalStartId = -1
  return {
    getNewId: () => temporalStartId--,
    getCurrentId: () => temporalStartId,
  }
})()

// 새로운 TODO에 대한 임시 todo
function createTemporalTodo(newTodo: ToDoRequest) {
  const now = new Date().getTime()
  return {
    ...parseTodoModelToViewModel({
      ...newTodo,
      id: temporalIdMaker.getNewId(),
      createAt: now,
      updateAt: now,
    }),
    isNew: true,
  }
}

// WARN: 서비스 형태에 따라, optimistic 방식이 다르나, 개인 사용자를 가정하고 작성
function usePostTodoQuery(getSearchKeyword: (() => string) | undefined) {
  const queryClient = useQueryClient()

  const context = useMutation({
    mutationFn,
    onMutate: async (newTodo) => {
      const searchKeyword = getSearchKeyword?.() ?? ''
      const temporalNewTodo = createTemporalTodo(newTodo)
      await queryClient.cancelQueries({
        queryKey: getTodoListKey(searchKeyword),
      })
      const previousTodos =
        queryClient.getQueryData<UseGetTodoListInfiniteQueryData>(
          getTodoListKey(searchKeyword)
        )

      // 추가된 아이템은 상위에 위치하도록함
      queryClient.setQueryData<UseGetTodoListInfiniteQueryData>(
        getTodoListKey(searchKeyword),
        (old) =>
          old && {
            ...old,
            pages: [
              {
                ...old.pages[0],
                list: [temporalNewTodo.id, ...old.pages[0].list],
              },
              ...old.pages.slice(1),
            ],
          }
      )
      // 임시 새로운 todo 등록
      queryClient.setQueryData(
        getTodoListItemKey(temporalNewTodo.id),
        parseTodoModelToViewModel(temporalNewTodo)
      )
      return { previousTodos, temporalNewTodo, searchKeyword }
    },
    onError: (_err, _variables, context) => {
      // 에러 발생 시, todo 목록 재취득 및 임시 todo 제거
      if (context) {
        queryClient.invalidateQueries({
          queryKey: getTodoListKey(context.searchKeyword),
        })
        queryClient.invalidateQueries({
          queryKey: getTodoListItemKey(context.temporalNewTodo.id),
        })
      }
    },
    onSettled: (data, _err, _variables, context) => {
      // WARN: new item을 보여주기 위하여, 다음 조회까지는 리스트를 갱신하지 않음음
      const newTodo = data
        ? {
            ...parseTodoModelToViewModel(data),
            isNew: true,
          }
        : null

      if (context) {
        // 새로 생성된 todo를 목록과 아이템으로 등록
        if (newTodo) {
          queryClient.setQueryData<UseGetTodoListInfiniteQueryData>(
            getTodoListKey(context.searchKeyword),
            (old) =>
              old && {
                ...old,
                pages: [
                  {
                    ...old.pages[0],
                    list: [
                      newTodo.id, // 새로운 todo 등록
                      ...old.pages[0].list.filter(
                        (v) => v !== context?.temporalNewTodo.id // 임시 todo 제거
                      ),
                    ],
                  },
                  ...old.pages.slice(1),
                ],
              }
          )
          queryClient.setQueryData(getTodoListItemKey(newTodo.id), newTodo)
        }

        // 임시 todo 제거
        queryClient.removeQueries({
          queryKey: getTodoListItemKey(context.temporalNewTodo.id),
          exact: true,
        })
      }
    },
  })

  return context
}

export default usePostTodoQuery
