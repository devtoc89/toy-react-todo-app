import { getTodoListKey } from '#/queries/todo/todo.query.key'
import { APIResponse } from '#/types/model/common/common.respose.model'
import { ToDoModel } from '#/types/model/todo/todo.model'
import { ToDoInfiniteViewModel } from '#/types/view-model/todo.view.model'
import { useInfiniteQuery } from '@tanstack/react-query'

/**
 * ReactQuery todo 목록 취득(infinity) 처리
 */

export type UseGetTodoListInfiniteQueryData = ReturnType<
  typeof useGetTodoListInfiniteQuery
>['data']

// 페이지 사이즈
const PAGE_SIZE = 10

async function queryFn(
  page: number,
  keyword: string
): Promise<ToDoInfiniteViewModel> {
  const res = await fetch('/api/todos')
  const data = (await res.json()) as APIResponse<Array<ToDoModel>>
  if (data.code !== 200 || !data.data) throw new Error('fail to process data.')

  // push로 등록되므로 역순으로 사용
  const processedList = (
    keyword ? data.data.filter((v) => v.text.includes(keyword)) : data.data
  ).reverse()

  const currentCusor = PAGE_SIZE * page
  const nextCursor = currentCusor + PAGE_SIZE

  return {
    list: processedList.slice(currentCusor, nextCursor).map((v) => v.id),
    hasNext: nextCursor < processedList.length,
  }
}

function useGetTodoListInfiniteQuery(keyword: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: getTodoListKey(keyword),
    queryFn: ({ pageParam }) => queryFn(pageParam, keyword),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : null,
  })

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }
}

export default useGetTodoListInfiniteQuery
