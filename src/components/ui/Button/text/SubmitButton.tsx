import { LoadingButton, LoadingButtonProps } from '@mui/lab'

/**
 * 전송 텍스트 버튼 공통 부품
 */
type SubmitButtonProps = Omit<LoadingButtonProps, 'variant' | 'type'>

function SubmitButton(props: SubmitButtonProps) {
  return (
    <LoadingButton
      {...props}
      variant="contained"
      type="submit"
      aria-label={props['aria-label'] ?? 'Submit'}
      children={props.children ?? '전송'}
    ></LoadingButton>
  )
}

export default SubmitButton
