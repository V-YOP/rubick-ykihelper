import { ElectronAPI, exposeElectronAPI } from '@electron-toolkit/preload'
import _ from 'lodash'
import {execSync} from 'child_process'
exposeElectronAPI()

// 自定义 API 放这里
declare global {
    interface Window {
      electron: ElectronAPI
      api: {
        /**
         * ready后resolve，可多次调用
         */
        whenReady(): Promise<RubickContext>,

        /**
         * out时resolve，可多次调用，疑无效
         */
        whenOut(): Promise<void>,
        /**
         * 三方node库测试
         */
        onePlusOne(): number,
        /**
         * 是否 darkmode
         */
        isDarkMode(): boolean,

        /**
         * 设置rubick和系统的darkmode，因为一些技术问题，调用后插件必须退出
         */
        setDarkMode(darkMode: boolean): void,

        /**
         * 分离当前插件窗口
         */
        detachMe(): void,
      },

      /**
       * 是否是mock环境
       */
      isMock: boolean
  }
}

const ipcSendSync = (type: string, data?: any) => {
  const returnValue = window.electron.ipcRenderer.sendSync('msg-trigger', {
    type,
    data,
  });
  if (returnValue instanceof Error) throw returnValue;
  return returnValue as unknown;
};

window.isMock = false

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
  isOut = true
  outCbs.forEach(f => f())
})
const whenOut: typeof window['api']['whenOut'] = () => {
  if (isOut) {
    // 按理说不会到这里
    return Promise.resolve()
  }
  return new Promise(resolve => outCbs.push(() => resolve()))
}

function isDarkMode(): boolean {
  const data = window.rubick.db.get('rubick-local-config')
  if (!data) {
    throw new Error('Impossible, me called before ready?')
  }
  return (data.data as any).perf.common.darkMode ?? false
}

function setDarkMode(darkMode: boolean) {
  const data = window.rubick.db.get('rubick-local-config')
  if (!data) {
    throw new Error('Impossible, me called before ready?')
  }
  (data as any).data.perf.common.darkMode = darkMode
  window.rubick.db.put(data)
  setSystemTheme(darkMode ? 'dark' : 'light')
  window.electron.ipcRenderer.send('re-register')
  window.rubick.showNotification('change theme to ' + (darkMode ? 'dark' : 'light'))
  window.rubick.outPlugin()
}

function setSystemTheme(theme: 'light' | 'dark') {
  if (!window.rubick.isWindows()) {
    window.rubick.showNotification('changing system theme only supports for windows system')
    return
  }
  const v = theme === 'light' ? 1 : 0
  execSync(`powershell -Command 
  "Set-ItemProperty 
  -Path 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' 
  -Name AppsUseLightTheme -Value ${v}; 
  Set-ItemProperty 
  -Path 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' 
  -Name SystemUsesLightTheme 
  -Value ${v}"`.replace(/\r?\n/g, ' '), {windowsHide: true, })
}

function detachMe() {
  ipcSendSync('detachPlugin')
}

window.api = {
  whenOut, whenReady, onePlusOne, isDarkMode, setDarkMode, detachMe
}