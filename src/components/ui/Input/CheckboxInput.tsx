import { Checkbox, CheckboxProps, Tooltip } from '@mui/material'
import { forwardRef } from 'react'

/**
 * 체크 박스 공통 부품
 */
type CheckboxInputPorps = CheckboxProps & { tooltipLabel?: string }

// 일반 함수형 컴포넌트
function CheckboxInput(props: CheckboxInputPorps) {
  return (
    <Tooltip
      title={props.tooltipLabel ?? props['aria-label']}
      placement="right-start"
    >
      <Checkbox
        {...props}
        disableRipple
        aria-label={undefined}
        inputProps={{ 'aria-label': props['aria-label'] }}
      />
    </Tooltip>
  )
}
export const CheckboxInputRef = forwardRef<
  HTMLButtonElement,
  CheckboxInputPorps
>((props: CheckboxInputPorps, ref) => {
  return CheckboxInput({ ...props, ref })
})

export default CheckboxInput
