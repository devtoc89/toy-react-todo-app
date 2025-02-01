import { APIResponse } from '#/types/model/common/common.respose.model'
import { ToDoRequest } from '#/types/model/todo/todo.if.model'
import { ToDoModel } from '#/types/model/todo/todo.model'
import { http, HttpResponse, PathParams } from 'msw'

const apiWrapper = <T>(data: T, code = 200, message = ''): APIResponse<T> => {
  return {
    code,
    message,
    data,
  }
}

const fetchToDos = (): ToDoModel[] => {
  try {
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
  } catch {
    // clear & set new data
    localStorage.setItem('todos', '[]')
    return []
  }
}

const setToDos = (todos: ToDoModel[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const getToDo = (id: number) => {
  const todos = fetchToDos()
  return todos.find((todo) => todo.id === id)
}

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json(apiWrapper<ToDoModel[]>(fetchToDos()))
  }),
  http.post<PathParams, ToDoRequest>('/api/todos', async ({ request }) => {
    const todos: ToDoModel[] = fetchToDos()
    const payload: ToDoRequest = await request.json()
    const newId = todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1
    const currentTime = new Date().getTime()
    const newToDo: ToDoModel = {
      id: newId,
      ...payload,
      createAt: currentTime,
      updateAt: currentTime,
    }
    todos.push(newToDo)
    setToDos(todos)
    return HttpResponse.json(apiWrapper<ToDoModel>(newToDo))
  }),
  http.get<PathParams<'id'>>('/api/todos/:id', ({ params }) => {
    return HttpResponse.json(
      apiWrapper<ToDoModel | undefined>(getToDo(Number(params.id)))
    )
  }),
  http.put<PathParams<'id'>, ToDoRequest>(
    '/api/todos/:id',
    async ({ params, request }) => {
      const todos: ToDoModel[] = fetchToDos()
      const payload: ToDoRequest = await request.json()
      const todoIdx = todos.findIndex((todo) => todo.id === Number(params.id))
      if (todoIdx < 0) {
        return HttpResponse.json(apiWrapper<void>(undefined, 404, 'Not Found'))
      } else {
        const todo = todos[todoIdx]
        const updatedToDo: ToDoModel = {
          ...todo,
          ...payload,
          id: todo.id,
          updateAt: new Date().getTime(),
        }
        todos[todoIdx] = updatedToDo
        setToDos(todos)
        return HttpResponse.json(apiWrapper<ToDoModel>(updatedToDo))
      }
    }
  ),
  http.delete<PathParams<'id'>>('/api/todos/:id', async ({ params }) => {
    const todos: ToDoModel[] = fetchToDos()
    const index = todos.findIndex((todo) => todo.id === Number(params.id))
    if (index < 0) {
      return HttpResponse.json(apiWrapper<void>(undefined, 404, 'Not Found'))
    } else {
      todos.splice(index, 1)
      setToDos(todos)
      return HttpResponse.json(apiWrapper<void>(undefined))
    }
  }),
]
