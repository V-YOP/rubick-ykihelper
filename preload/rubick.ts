import { type BrowserWindow, type BrowserWindowConstructorOptions } from "electron"


type RubickAPI = {
  /**
   * 用 `api.whenReady` !
   * @deprecated
   */
  onPluginReady(cb: (ctx: RubickContext) => void): void,
  /**
   * 用 `api.whenOut` !
   * @deprecated
   */
  onPluginOut(cb: () => void): void,
  /**
   * 用 `useSubInput` hook！
   * @deprecated
   */
  setSubInput: (onChange: (value: {text: string}) => void) => void,
  setSubInputValue: (value: string) => void,
  showNotification: (msg: string) => void,
  hideMainWindow: () => void, 
  showMainWindow: () => void,
  setExpendHeight: (height: number) => void,
  getPath: (name: string) => void,
  shellOpenPath: (fullPath: string) => void,
  shellOpenExternal: (url: string) => void,
  db: {
    put: <T>(doc: DBPutReq<T>) => DBUpdateRes,
    get: <T>(id: string) => DBDoc<T> | null,
    remove: (idOrReq: DBRemoveReq) => DBUpdateRes,
    bulkDocs: (docs: DBPutReq<unknown>[]) => DBUpdateRes[],
    allDocs: (id?: string | string[]) => DBDoc<unknown>[],
  },
  outPlugin: () => void,
  isWindows: () => boolean,
  isLinux: () => boolean,
  isMacOs: () => boolean,
  shellBeep: () => void,
  /**
   * 创建新窗口，注意该新窗口是没有 window.rubick API 的
   * @param url 窗口 html 路径 
   * @param option 窗口 option，name 必须给定为插件项目名，webPreferences必须给定（为 `{}` 也可）
   * @param onDomReady 
   * @returns 
   */
  createBrowserWindow: (url: string, option: BrowserWindowConstructorOptions & {name: string}, onDomReady?: () => void) => BrowserWindow
}

type DBPutReq<T> = {
  _id: string,
  data: T,
  _rev?: string,
}

type DBRemoveReq = {
  _id: string, _rev?: string,
} | string

type DBDoc<T> = {
  _id: string,
  data: T,
  _rev: string,
}

type DBUpdateRes = {
  id: string,
  ok: true,
  error: undefined,
  rev: string,
} | {
  id: string,
  ok: undefined,
  error: true,
  name: string,
  message: string,
}

declare global {
  interface Window {
      rubick: RubickAPI
  }
  type RubickContext = 
  { code: string } &
  ({
    type: "text"
  } | {
    type:  "regex" |  "over" | 'img'
    payload: string,
  } | {
    type: 'file',
    payload: {
      isFile: boolean, 
      isDirectory: boolean,
      name: string, 
      path: string,
    }
  } | {
    type: 'window',
    payload: any,
  })
}

export {
  
}