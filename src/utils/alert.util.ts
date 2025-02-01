import { debounce } from 'es-toolkit'
import { toast } from 'react-toastify'

/**
 * toast 처리를 위한 유틸
 */
// toast debounce handler
const toastDebounce = debounce((callback) => callback(), 200)

// toat 유틸
const ttoast = {
  success: (msg: string) => {
    toastDebounce(() => toast.success(msg))
  },
  warning: (msg: string) => {
    toastDebounce(() => toast.warning(msg))
  },
  error: (msg: string) => {
    toastDebounce(() => toast.error(msg))
  },
  info: (msg: string) => {
    toastDebounce(() => toast.info(msg))
  },
}

export { ttoast }
