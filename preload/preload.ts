// 
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
      electron: ElectronAPI
      api: {
        whenReady(): Promise<RubickContext>
      },
      isProd: boolean | undefined
  }
}

window.isProd = true
// @ts-ignore
window.api ??= {}

let lastCtx: RubickContext | undefined 
const cbs: ((ctx: RubickContext) => void)[] = []
window.rubick.onPluginReady(ctx => {
  lastCtx = ctx
  cbs.forEach(f => f(ctx))
})
window.api.whenReady = () => {
  if (lastCtx) {
    return Promise.resolve(lastCtx)
  }
  return new Promise(resolve => {
    cbs.push(resolve)
  })
}

