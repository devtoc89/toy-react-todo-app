import SearchIcon from '@mui/icons-material/Search'

import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { Tooltip } from '@mui/material'

/**
 * 조회 아이콘 버튼 공통 부품
 */
type SearchIconButtonProps = Omit<
  LoadingButtonProps,
  'variant' | 'type' | 'children'
>

function SearchIconButton(props: SearchIconButtonProps) {
  return (
    <Tooltip title="Search" placement="top">
      <LoadingButton
        {...props}
        variant="outlined"
        aria-label={props['aria-label'] ?? 'Search'}
      >
        <SearchIcon />
      </LoadingButton>
    </Tooltip>
  )
}

export default SearchIconButton
