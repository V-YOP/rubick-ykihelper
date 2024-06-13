import { ElectronAPI } from '@electron-toolkit/preload'
import _ from 'lodash'

declare global {
    interface Window {
      electron: ElectronAPI
      api: {
        whenReady(): Promise<RubickContext>,
        whenOut(): Promise<void>,
        /**
         * for testuse
         */
        onePlusOne(): number,
      },
      isProd: boolean | undefined
  }
}

window.isProd = true

const onePlusOne = () => _.add(1, 2)

let lastCtx: RubickContext | undefined 
const readyCbs: ((ctx: RubickContext) => void)[] = []
window.rubick.onPluginReady(ctx => {
  lastCtx = ctx
  readyCbs.forEach(f => f(ctx))
})
const whenReady: typeof window['api']['whenReady'] = () => {
  if (lastCtx) {
    return Promise.resolve(lastCtx)
  }
  return new Promise(resolve => {
    readyCbs.push(resolve)
  })
}

let isOut = false
const outCbs: (() => void)[] = []
window.rubick.onPluginOut(() => {
  window.rubick.showNotification('mygo')
  isOut = true
  outCbs.forEach(f => f())
})
const whenOut: typeof window['api']['whenOut'] = () => {
  if (isOut) {
    return Promise.resolve()
  }
  return new Promise(resolve => outCbs.push(() => resolve()))
}

window.api = {
  whenOut, whenReady, onePlusOne,
}