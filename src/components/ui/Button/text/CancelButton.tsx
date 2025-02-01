import { LoadingButton, LoadingButtonProps } from '@mui/lab'

/**
 * 취소 텍스트 버튼 공통 부품
 */
type CancelButtonProps = Omit<LoadingButtonProps, 'variant' | 'type'>

function CancelButton(props: CancelButtonProps) {
  return (
    <LoadingButton
      {...props}
      variant="outlined"
      type="button"
      aria-label={props['aria-label'] ?? 'Cancel'}
      children={props.children ?? '취소'}
    ></LoadingButton>
  )
}

export default CancelButton
