import React from 'react'
import ReactDOM from 'react-dom/client'

import CommonLayer from '#/components/layers/CommonLayer'
import TodoPage from '#/pages/todo/TodoPage'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { worker } from './mocks/browser'

import '#/global.css'

// 시간 정보에 대한 처리가 없어, 날짜 정보만 timezone 상관없이 처리하기 위하여, utc 처리
dayjs.extend(utc)

worker.start()

const root = ReactDOM.createRoot(document.getElementById('root')!)

worker
  .start({
    quiet: true,
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
  .then(() => {
    return root.render(
      <React.StrictMode>
        <CommonLayer>
          <TodoPage />
        </CommonLayer>
      </React.StrictMode>
    )
  })
