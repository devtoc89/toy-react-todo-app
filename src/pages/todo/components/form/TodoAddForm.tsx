import ResetIconButton from '#/components/ui/Button/icon/ResetIconButton'
import SubmitButton from '#/components/ui/Button/text/SubmitButton'
import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import usePostTodoQuery from '#/queries/todo/usePostTodoQuery'
import { ttoast } from '#/utils/alert.util'
import { convertDateStrToUtcMs, LONG_DATE_FORMAT } from '#/utils/date.util'

import { Stack, SxProps, TextField, Theme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useCallback, useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'

/**
 * Todo 추가 컴포넌트(페이지 종속)
 */

type FormProps = { text: string; deadlineDate: dayjs.Dayjs }

const formControllerSx: SxProps<Theme> = {
  flex: '1 1 10rem',
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    top: 'calc(100% - 0.25rem)',
  },
}

function useAdd() {
  const store = useContext(TodoListStateStoreContext)
  const getSearchKeyword = store?.((s) => s.getSearchKeyword)
  const { mutateAsync, isPending } = usePostTodoQuery(getSearchKeyword)
  return { mutateAsync, isPending }
}

function useAddForm() {
  return useForm<FormProps>({
    defaultValues: {
      text: '',
      deadlineDate: dayjs().add(3, 'day'),
    },
  })
}

function TodoAddForm() {
  const { mutateAsync, isPending } = useAdd()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useAddForm()

  const onSubmit = useCallback(
    async (data: FormProps) => {
      try {
        await mutateAsync({
          text: data.text,
          done: false,
          deadline: convertDateStrToUtcMs(
            data.deadlineDate.format(LONG_DATE_FORMAT)
          ),
        })

        ttoast.success('TODO가 성공적으로 생성되었습니다.')
      } catch {
        ttoast.error('TODO를 생성하는데 실패하였습니다.')
      }
    },
    [mutateAsync]
  )

  return (
    <form onSubmit={handleSubmit((data) => void onSubmit(data))}>
      <Stack flexDirection="row" gap={0.25} rowGap={1.75} flexWrap="wrap">
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
                sx={formControllerSx}
                slotProps={{
                  textField: {
                    error: !!errors.deadlineDate,
                    helperText: errors.deadlineDate?.message,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
        <Stack flexDirection="row" height="3.5rem" gap={0.25}>
          <SubmitButton loading={isPending}>등록</SubmitButton>
          <ResetIconButton onClick={() => reset()} loading={isPending} />
        </Stack>
      </Stack>
    </form>
  )
}
export default TodoAddForm
