import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'

/**
 * 삭제 아이콘 버튼 공통 부품
 */
type DeleteIconButtonProps = Omit<IconButtonProps, 'type' | 'children'>

function DeleteIconButton(props: DeleteIconButtonProps) {
  return (
    <Tooltip title="Delete" placement="top">
      <IconButton {...props} aria-label={props['aria-label'] ?? 'Delete'}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteIconButton
