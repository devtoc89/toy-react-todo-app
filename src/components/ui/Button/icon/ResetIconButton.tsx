import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { Tooltip } from '@mui/material'

/**
 * 리셋 아이콘 버튼 공통 부품
 */
type ResetIconButtonProps = Omit<
  LoadingButtonProps,
  'variant' | 'type' | 'children'
>

function ResetIconButton(props: ResetIconButtonProps) {
  return (
    <Tooltip title="Reset" placement="top">
      <LoadingButton
        {...props}
        variant="outlined"
        aria-label={props['aria-label'] ?? 'Reset'}
      >
        <RestartAltIcon />
      </LoadingButton>
    </Tooltip>
  )
}

export default ResetIconButton
