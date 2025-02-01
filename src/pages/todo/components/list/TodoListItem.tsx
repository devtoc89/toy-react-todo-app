import EditIconButton from '#/components/ui/Button/icon/EditIconButton'
import CheckboxInput from '#/components/ui/Input/CheckboxInput'
import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import TodoModifyForm from '#/pages/todo/components/form/TodoModifyForm'
import useGetTodoQuery from '#/queries/todo/useGetTodoQuery'
import { ToDoViewModel } from '#/types/view-model/todo.view.model'

import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined'
import { Fade, ListItemText, Skeleton, Stack, Typography } from '@mui/material'
import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

/**
 * Todo 컴포넌트(페이지 종속)
 */

function TodoListItemSkeleton() {
  return (
    <Stack component="li" width="100%" p={1}>
      <Skeleton variant="rectangular" width="100%" height="1rem" />
    </Stack>
  )
}

function TodoListItemCheck({ id }: { id: number }) {
  const store = useContext(TodoListStateStoreContext)
  const allChecked = store?.((s) => s.getIsAllChecked())
  const checked = store?.((s) => s.getIsChecked(id))
  const toggleCheck = store?.((s) => s.toggleChecked)
  return (
    <CheckboxInput
      onClick={() => toggleCheck?.(id)}
      checked={allChecked !== checked}
      aria-label="Select Todo"
    />
  )
}

function TodoText({ isNew, text }: { isNew?: boolean; text: string }) {
  return (
    <Typography
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      width="100%"
      overflow="hidden"
    >
      {isNew ? <FiberNewOutlinedIcon /> : ''}
      {text}
    </Typography>
  )
}

function TodoDateText({
  deadlineDate,
  todoStatusText,
}: {
  deadlineDate: string
  todoStatusText?: string
}) {
  return (
    <ListItemText
      primary={deadlineDate}
      secondary={todoStatusText}
      sx={{ textAlign: 'right', width: 'fit-content', flex: 'none' }}
    />
  )
}
function useGet({ id }: { id: number }) {
  const [value, setValue] = useState<ToDoViewModel | null>(null)
  const { data, isLoading, isError } = useGetTodoQuery(id)

  useEffect(() => {
    if (!isLoading) {
      if (!data) setValue(null)
      else if (!value || value.updateAt !== data.updateAt) setValue(data)
    }
  }, [data, isLoading, value])

  return { value, isLoading, isError }
}

function TodoListItem({
  id,
  columnFlexs,
}: {
  id: number
  columnFlexs: Array<string>
}) {
  const { value } = useGet({ id })
  const [isModifing, setIsModifing] = useState(false)
  const handleOnClose = useCallback(() => setIsModifing(false), [setIsModifing])
  const handleOnModify: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsModifing((prev) => !prev)
    },
    [setIsModifing]
  )

  if (!value) {
    return <TodoListItemSkeleton />
  }

  return (
    <Stack component="li" width="100%">
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{ background: value.done ? '#eee' : 'transparent' }}
      >
        <Stack flex={columnFlexs[0]}>
          <TodoListItemCheck id={value.id} />
        </Stack>
        <Stack flex={columnFlexs[1]} overflow="hidden">
          <TodoText isNew={value.isNew} text={value.text} />
        </Stack>
        <Stack flex={columnFlexs[2]}>
          <TodoDateText
            deadlineDate={value.deadlineDate}
            todoStatusText={value.todoStatusText}
          />
        </Stack>
        <Stack flex={columnFlexs[3]}>
          <EditIconButton onClick={handleOnModify} />
        </Stack>
      </Stack>
      {isModifing && (
        <Fade in={isModifing}>
          <Stack padding={1.5} flexWrap="wrap">
            <TodoModifyForm close={handleOnClose} todo={value} />
          </Stack>
        </Fade>
      )}
    </Stack>
  )
}

export default TodoListItem
