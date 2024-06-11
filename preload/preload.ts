// 
import { ElectronAPI } from '@electron-toolkit/preload'
import { type RubickContext } from './rubick'

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
window.api.whenReady = () => {
  if (lastCtx) {
    return Promise.resolve(lastCtx)
  }
  return new Promise(resolve => {
    window.rubick.onPluginReady(ctx => {
      lastCtx = ctx
      resolve(ctx)
    })
  })
}
window.api.whenReady().then(console.log)

