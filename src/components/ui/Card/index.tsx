import { Paper, PaperProps } from '@mui/material'

/**
 * 컨텐츠 카드 공통 부품
 */
function Card(props: PaperProps) {
  return (
    <Paper
      elevation={3}
      {...props}
      sx={{ px: 1.25, py: 1.25, ...(props.sx ?? {}) }}
    />
  )
}
export default Card
