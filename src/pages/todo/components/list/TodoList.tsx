import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import TodoListHeader from '#/pages/todo/components/list/TodoListHeader'
import TodoListItem from '#/pages/todo/components/list/TodoListItem'
import useGetTodoListInfiniteQuery from '#/queries/todo/useGetTodoListInfiniteQuery'
import { ttoast } from '#/utils/alert.util'
import { CircularProgress, Divider, Stack, Typography } from '@mui/material'
import List from '@mui/material/List'
import { debounce, isEqual, throttle } from 'es-toolkit'
import React, { useContext, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * Todo 목록 컴포넌트(페이지 종속)
 */

const eventDebounce = debounce((callback) => callback(), 300)
const eventThrottle = throttle(
  (callback) => eventDebounce(() => callback()),
  600
)

function useGetTodoList() {
  const store = useContext(TodoListStateStoreContext)
  const keyword = store?.((s) => s.getSearchKeyword())
  return useGetTodoListInfiniteQuery(keyword ?? '')
}

function ExchangeGetTodoKeyList() {
  const store = useContext(TodoListStateStoreContext)
  const setIdList = store?.((s) => s.setIdList)
  const getIdList = store?.((s) => s.getIdList)
  const { data, isFetching } = useGetTodoList()

  useEffect(() => {
    if (!isFetching && setIdList && getIdList) {
      if (!data) setIdList([])
      const prev = getIdList()
      const newList = [...new Set(data?.pages.flatMap((v) => v.list))]
      if (!isEqual(newList, prev)) {
        setIdList(newList)
      }
    }
  }, [data, getIdList, isFetching, setIdList])

  return <></>
}

function Loader() {
  const { hasNextPage, fetchNextPage, error, isFetching } = useGetTodoList()
  const [ref, InView] = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    if (hasNextPage && InView && !isFetching) {
      eventThrottle(fetchNextPage)
    }
  }, [InView, hasNextPage, fetchNextPage, isFetching])

  useEffect(() => {
    if (error) {
      ttoast.error('데이터를 취득하는데 에러가 발생하였습니다.')
    }
  }, [error])

  return (
    <>
      {hasNextPage && (
        <Stack
          component="li"
          ref={ref}
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <CircularProgress aria-label="on loading." />
        </Stack>
      )}
      <ExchangeGetTodoKeyList />
    </>
  )
}

const TodoListItemMemo = React.memo(TodoListItem)

function ListContent({ columnFlexs }: { columnFlexs: Array<string> }) {
  const store = useContext(TodoListStateStoreContext)
  const list = store?.((s) => s.getIdList())

  if (!list || !list?.length) {
    return (
      <li>
        <Typography>데이터가 없습니다.</Typography>
      </li>
    )
  }

  return (
    <>
      {list.map((v) => (
        <TodoListItemMemo key={v} id={v} columnFlexs={columnFlexs} />
      ))}
    </>
  )
}

function TodoList() {
  const columnFlexs = ['0 0 2.875rem', '1', '0 0 4rem', '0 0 2.75rem']
  return (
    <Stack height="100%" width="100%" overflow="hidden" gap={0.1}>
      <Stack pr={0.25}>
        <TodoListHeader columnFlexs={columnFlexs} />
      </Stack>
      <Divider />
      <Stack flex="1 0" overflow="hidden" pr="calc(0.25rem - 5px)">
        <List
          sx={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          <ListContent columnFlexs={columnFlexs} />
          <Loader />
        </List>
      </Stack>
    </Stack>
  )
}

export default TodoList
