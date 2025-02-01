import CheckboxInput from '#/components/ui/Input/CheckboxInput'
import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import { Box, FormControlLabel, Stack, Typography } from '@mui/material'
import { ReactNode, useContext } from 'react'

function CheckAllCheckBox() {
  const store = useContext(TodoListStateStoreContext)

  const checked = store?.((s) => s.getIsAllChecked())
  const toggleAllChecked = store?.((s) => s.toggleAllChecked)
  return (
    <Stack
      position="relative"
      sx={{
        'label.MuiFormControlLabel-root': {
          margin: 0,
        },
      }}
    >
      <FormControlLabel
        control={
          <CheckboxInput
            onClick={() => toggleAllChecked?.()}
            checked={checked}
            aria-label="Select Visible Todo"
          />
        }
        sx={{
          '.MuiFormControlLabel-label': {
            position: 'absolute',
            width: 'max-content',
            top: '-1rem',
            fontSize: '0.75rem',
          },
        }}
        label="Select Visible Todo"
      />
    </Stack>
  )
}

function ListHeaderColumn({ children }: { children: ReactNode }) {
  return (
    <>
      {typeof children === 'string' ? (
        <Typography
          fontWeight={700}
          fontSize="0.875rem"
          sx={{ userSelect: 'none' }}
        >
          {children}
        </Typography>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  )
}

function TodoListHeader({ columnFlexs }: { columnFlexs: Array<string> }) {
  return (
    <Stack width="100%">
      <Stack flexDirection="row" alignItems="center" textAlign="center">
        <Stack flex={columnFlexs[0]} pt="1rem">
          <ListHeaderColumn>
            <CheckAllCheckBox />
          </ListHeaderColumn>
        </Stack>
        <Stack flex={columnFlexs[1]}>
          <ListHeaderColumn>Todo</ListHeaderColumn>
        </Stack>
        <Stack flex={columnFlexs[2]}>
          <ListHeaderColumn>Date Status</ListHeaderColumn>
        </Stack>
        <Stack flex={columnFlexs[3]}>
          <ListHeaderColumn>Edit</ListHeaderColumn>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default TodoListHeader
