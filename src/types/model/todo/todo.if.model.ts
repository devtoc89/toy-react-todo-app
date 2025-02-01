import { ToDoModel } from '#/types/model/todo/todo.model'

export type ToDoRequest = Omit<ToDoModel, 'id' | 'createAt' | 'updateAt'> & {
  id?: number
}
