import { ToDoRequest } from '#/types/model/todo/todo.if.model'
import { ToDoModel } from '#/types/model/todo/todo.model'
import { ToDoViewModel } from '#/types/view-model/todo.view.model'
import {
  convertUtcMsToDateStr,
  getCurrentDateUtcMsTime,
} from '#/utils/date.util'

/**
 * todo model(react query 기반) <-> todo view model 처리
 */

// 하루 밀리초
const oneDayMs = 86400000

// 3일 deadline 이하일 경우 텍스트
function makeRemainDateText(remainDate: number) {
  if (!remainDate) return '오늘까지'
  if (remainDate < 0) return `${-remainDate}일 지남`
  return `${remainDate}일 남음`
}

// deadline, done에 따른 텍스트 생성
function makeTodoStatusText(todo: ToDoModel) {
  if (todo.done) return '완료'
  const dayRemain =
    todo.deadline - Math.floor(getCurrentDateUtcMsTime() / oneDayMs) * oneDayMs

  return makeRemainDateText(Math.ceil(dayRemain / oneDayMs))
}

// todo model을 Todo view model로 변환
export function parseTodoModelToViewModel(todo: ToDoModel): ToDoViewModel {
  return {
    ...todo,
    todoStatusText: makeTodoStatusText(todo),
    deadlineDate: convertUtcMsToDateStr(todo.deadline),
  }
}

// todo view model을 todo request model로 변환
export function parseTodoViewModelToRequestModel(
  todo: ToDoViewModel
): ToDoRequest {
  return {
    id: todo.id,
    text: todo.text,
    done: todo.done,
    deadline: todo.deadline,
  }
}
