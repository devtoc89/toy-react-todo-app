import dayjs from 'dayjs'

/**
 * date 처리를 위한 유틸
 */
// 긴 날짜 문자열 표현 포멧
export const LONG_DATE_FORMAT = 'YYYY/MM/DD'
// 짧은 날짜 문자열 표현 포멧
export const SHORT_DATE_FORMAT = 'YY/MM/DD'

// 날짜를 utc 시간(ms)으로 변경(timezone 무관하게 변경하여 날짜 정보만 utc로 유지)
export function convertDateStrToUtcMs(date: string) {
  return dayjs(date).utc(true).toDate().getTime()
}

// utc 시간(ms)을 짤은 날짜 문자열로 변경
export function convertUtcMsToDateStr(ms: number) {
  return dayjs(new Date(ms)).utc().format(SHORT_DATE_FORMAT)
}

// 현재 시간을 utc 기준으로 반환(ms)
export function getCurrentDateUtcMsTime() {
  return dayjs(dayjs().format(LONG_DATE_FORMAT)).utc(true).toDate().getTime()
}
