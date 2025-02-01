/**
 * todo 뷰 모델
 */

import { ToDoModel } from '#/types/model/todo/todo.model'

// 뷰 처리를 위한 todo 모델
export interface ToDoViewModel extends ToDoModel {
  deadlineDate: string
  isNew?: boolean
  todoStatusText?: string
}

// react query 인피니티 쿼리 사용 시 모델(목록은 id만 갖음)
export interface ToDoInfiniteViewModel {
  list: Array<number>
  hasNext: boolean
}
