import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { ReactNode } from 'react'

// spacing 관련 숫자는 rem으로 변환 처리
function translateNumberToRem(value: number) {
  return value + 'rem'
}

// 테마
const theme = createTheme({
  spacing: translateNumberToRem,
  typography: {
    fontFamily: 'Inter Variable, Arial, sans-serif', // 기본 폰트 지정
    fontSize: 16, // 기본 폰트 크기(px) 지정
    body1: {
      fontSize: '1rem', // 16px 기준 (rem 단위)
    },
    body2: {
      fontSize: '0.875rem', // 약 14px
    },
  },
  palette: {
    primary: {
      main: '#00B8A9', // 청록색 (보색)
      light: '#5EFFE6', // 밝은 청록색
      dark: '#00796B', // 어두운 청록색
      contrastText: '#FFFFFF', // 흰색 텍스트
    },
    secondary: {
      main: '#FF4052',
      light: '#FF8795',
      dark: '#B71B36',
      contrastText: '#FFFFFF',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
          background: '#ECECEC',
          borderRadius: ' 3px',
          width: '5px',
          height: '5px',
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '3px',
          background: '#2E3B43',
        },
        '::-webkit-scrollbar-thumb:hover': {
          borderRadius: '10px',
          backgroundColor: '#7D7D7D',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBlockStart: 0,
          marginBlockEnd: 0,
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },
      },
    },
  },
})

// MUI 테마 프로바이더
function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
