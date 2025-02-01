export interface ToDoModel {
  id: number // PK
  text: string // To-Do 내용
  done: boolean // 완료 여부
  deadline: number // 기한 (timestamp - milliseconds)
  createAt: number // 생성시간(Ms)
  updateAt: number // 갱신일(Ms)
}
