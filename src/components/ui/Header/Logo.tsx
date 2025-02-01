import { Box, Typography } from '@mui/material'

/**
 * 로고 컴포넌트
 */
function Logo() {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h6" ml={1} style={{ userSelect: 'none' }}>
        TODO
      </Typography>
    </Box>
  )
}

export default Logo
