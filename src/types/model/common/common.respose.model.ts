export interface APIResponse<T> {
  code: number // HTTP Code
  message?: string // message
  data?: T
}
