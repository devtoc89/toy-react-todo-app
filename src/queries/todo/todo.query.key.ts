/**
 * todo react query key 관리
 */

// react query의 todo list 키
export const getTodoListKey = (searchKeyword: string) => [
  'todos',
  searchKeyword,
]

// react query의 todo list item 키
export const getTodoListItemKey = (id: number) => [`todo`, id]
