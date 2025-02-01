import BaseContentLayer from '#/components/layers/BaseContentLayer'
import Card from '#/components/ui/Card'
import { TodoListStateStoreContext } from '#/contexts/TodoListContext'
import TodoAddForm from '#/pages/todo/components/form/TodoAddForm'
import TodoList from '#/pages/todo/components/list/TodoList'
import TodoListMenu from '#/pages/todo/components/list/TodoListMenu'
import { createUseTodoListStateStore } from '#/stores/useTodoListStateStore'
import { Box, Container, Stack } from '@mui/material'
import { useRef } from 'react'

/**
 * Todo 페이지
 */

function TodoPage() {
  const ref = useRef(createUseTodoListStateStore())

  return (
    <TodoListStateStoreContext.Provider value={ref.current}>
      <BaseContentLayer>
        <Container maxWidth="lg" sx={{ height: '100%', minWidth: '360px' }}>
          <Stack height="100%" gap={0.25} py={2}>
            <Card>
              <TodoAddForm />
            </Card>
            <Card sx={{ flex: '1 0 0' }}>
              <Stack height="100%" gap={0.25}>
                <Box>
                  <TodoListMenu />
                </Box>
                <Box sx={{ flex: '1 0 0' }} p={0.25} overflow="hidden">
                  <TodoList />
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </BaseContentLayer>
    </TodoListStateStoreContext.Provider>
  )
}

export default TodoPage
