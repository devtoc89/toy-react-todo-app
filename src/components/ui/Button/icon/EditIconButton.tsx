import EditIcon from '@mui/icons-material/Edit'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'

/**
 * 수정 아이콘 버튼 공통 부품
 */
type EditIconButtonProps = Omit<IconButtonProps, 'type' | 'children'>

function EditIconButton(props: EditIconButtonProps) {
  return (
    <Tooltip title="Edit" placement="top">
      <IconButton {...props} aria-label={props['aria-label'] ?? 'Edit'}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

export default EditIconButton
