import { debounce } from 'es-toolkit'
import { toast } from 'react-toastify'

/**
 * toast 처리를 위한 유틸
 */
// toast debounce handler
const toastifyCommonOption = { autoClose: 1000 }
const toastDebounce = debounce((callback) => callback(), 200)

// toat 유틸
const ttoast = {
  success: (msg: string) => {
    toastDebounce(() => toast.success(msg, { ...toastifyCommonOption }))
  },
  warning: (msg: string) => {
    toastDebounce(() => toast.warning(msg, { ...toastifyCommonOption }))
  },
  error: (msg: string) => {
    toastDebounce(() => toast.error(msg, { ...toastifyCommonOption }))
  },
  info: (msg: string) => {
    toastDebounce(() => toast.info(msg, { ...toastifyCommonOption }))
  },
}

export { ttoast }
