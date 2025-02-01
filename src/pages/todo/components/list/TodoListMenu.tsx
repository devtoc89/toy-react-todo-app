import DeleteIconButton from '#/components/ui/Button/icon/DeleteIconButton'
import SearchBarInput from '#/components/ui/Input/SearchInput'
import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import useDeleteTodoQuery from '#/queries/todo/useDeleteTodoQuery'
import useTodoSearchKeywordStore from '#/stores/useTodoSearchKeywordStore'
import { ttoast } from '#/utils/alert.util'
import { Stack } from '@mui/material'
import { useCallback, useContext } from 'react'

/**
 * Todo 목록 컨트롤 컴포넌트(페이지 종속)
 * 1. 조회
 * 2. 삭제
 */

function useRemove() {
  const store = useContext(TodoListStateStoreContext)
  const searchKeyword = store?.((s) => s.getSearchKeyword())
  const { mutateAsync, isPending } = useDeleteTodoQuery(searchKeyword ?? '')
  return { mutateAsync, isPending }
}

function useRemoveButton() {
  const store = useContext(TodoListStateStoreContext)

  const { mutateAsync, isPending } = useRemove()
  const resetChecked = store?.((s) => s.resetAllChecked)
  const getCheckedIdList = store?.((s) => s.getCheckedIdList)

  const onDelete = useCallback(async () => {
    try {
      if (!getCheckedIdList || !resetChecked) {
        ttoast.error('TODO를 삭제하는데 실패하였습니다.')
        return
      }
      const idList = getCheckedIdList()
      if (!idList.length) {
        ttoast.warning('삭제할 TODO를 선택해 주세요.')
        return
      }
      await mutateAsync(idList)
      resetChecked()
      ttoast.success('TODO가 성공적으로 삭제되었습니다.')
    } catch {
      ttoast.error('TODO를 삭제하는데 실패하였습니다.')
    }
  }, [getCheckedIdList, mutateAsync, resetChecked])

  return { onDelete, isPending }
}

function RemoveButton() {
  const { onDelete, isPending } = useRemoveButton()
  return (
    <DeleteIconButton
      onClick={onDelete}
      disabled={isPending}
      aria-label="delete"
      size="large"
    />
  )
}

function TodoAction() {
  return (
    <Stack justifyContent="center">
      <RemoveButton />
    </Stack>
  )
}

function SearchBar() {
  const store = useContext(TodoListStateStoreContext)
  const setSearchKeyword = store?.((s) => s.setSearchKeyword)
  const searchHistory = useTodoSearchKeywordStore((s) => s.getHistory())
  const setSearchHistory = useTodoSearchKeywordStore((s) => s.setHistory)
  const handleOnSearch = useCallback(
    (keyword: string) => {
      setSearchKeyword?.(keyword)
      setSearchHistory(keyword)
    },
    [setSearchKeyword, setSearchHistory]
  )

  return (
    <Stack flex="0 1 20rem">
      <SearchBarInput
        onSearch={handleOnSearch}
        history={searchHistory}
        gap={0.25}
        flexWrap="wrap"
        label="Search Todo"
      />
    </Stack>
  )
}

function TodoListMenu() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap-reverse"
    >
      <TodoAction />
      <SearchBar />
    </Stack>
  )
}

export default TodoListMenu
