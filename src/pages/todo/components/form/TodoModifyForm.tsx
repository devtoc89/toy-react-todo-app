import ResetIconButton from '#/components/ui/Button/icon/ResetIconButton'
import CancelButton from '#/components/ui/Button/text/CancelButton'
import SubmitButton from '#/components/ui/Button/text/SubmitButton'
import { CheckboxInputRef } from '#/components/ui/Input/CheckboxInput'
import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import usePutTodoQuery from '#/queries/todo/usePutTodoQuery'
import { ToDoViewModel } from '#/types/view-model/todo.view.model'
import { ttoast } from '#/utils/alert.util'
import { convertDateStrToUtcMs, LONG_DATE_FORMAT } from '#/utils/date.util'
import {
  FormControlLabel,
  Stack,
  SxProps,
  TextField,
  Theme,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useCallback, useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'

/**
 * Todo 수정 컴포넌트(페이지 종속)
 */

type FormProps = { text: string; deadlineDate: dayjs.Dayjs; done: boolean }

const formControllerSx: SxProps<Theme> = {
  flex: '1 0 10rem',
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    top: 'calc(100% - 0.25rem)',
  },
}

function useModify() {
  const store = useContext(TodoListStateStoreContext)
  const searchKeyword = store?.((s) => s.getSearchKeyword())
  const { mutateAsync, isPending } = usePutTodoQuery(searchKeyword ?? '')
  return { mutateAsync, isPending }
}

function useModifyForm({ todo }: { todo: ToDoViewModel }) {
  return useForm<FormProps>({
    defaultValues: {
      text: todo.text,
      deadlineDate: dayjs(new Date(todo.deadline)).utc(),
      done: todo.done,
    },
  })
}

function TodoModifyForm({
  todo,
  close,
}: {
  todo: ToDoViewModel
  close: () => void
}) {
  const { mutateAsync, isPending } = useModify()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useModifyForm({ todo })

  const onSubmit = useCallback(
    async ({ text, deadlineDate, done }: FormProps) => {
      try {
        await mutateAsync({
          ...todo,
          text,
          done,
          deadline: convertDateStrToUtcMs(
            deadlineDate.format(LONG_DATE_FORMAT)
          ),
        })

        ttoast.success('TODO가 성공적으로 수정되었습니다.')
        close()
      } catch {
        ttoast.error('TODO를 수정하는데 실패하였습니다.')
      }
    },
    [mutateAsync, todo, close]
  )

  return (
    <form onSubmit={handleSubmit((data) => void onSubmit(data))}>
      <Stack
        flexDirection="row"
        gap={0.25}
        rowGap={1}
        alignItems="center"
        flexWrap="wrap"
      >
        <Controller
          name="text"
          control={control}
          rules={{ required: 'Todo를 입력해 주세요.' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Todo"
              variant="outlined"
              error={!!errors.text}
              helperText={errors.text?.message}
              sx={formControllerSx}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="deadlineDate"
            control={control}
            rules={{ required: '기간을 지정해 주세요.' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Deadline"
                format="YYYY/MM/DD"
                onChange={(value) => field.onChange(value)}
                slotProps={{
                  textField: {
                    error: !!errors.deadlineDate,
                    helperText: errors.deadlineDate?.message,
                  },
                }}
                sx={formControllerSx}
              />
            )}
          />
        </LocalizationProvider>
        <Controller
          name="done"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <CheckboxInputRef
                  {...field}
                  checked={!!field.value}
                  aria-label="Make Todo Done"
                />
              }
              label="DONE"
              labelPlacement="top"
            />
          )}
        ></Controller>

        <Stack flexDirection="row" gap={0.25}>
          <SubmitButton loading={isPending}>수정</SubmitButton>
          <ResetIconButton onClick={() => reset()} loading={isPending} />
          <CancelButton loading={isPending} onClick={close} />
        </Stack>
      </Stack>
    </form>
  )
}
export default TodoModifyForm
