

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
  setSubInput: (onChange: (value: {text: string}) => void) => void,
  setSubInputValue: (value: string) => void,
  showNotification: (msg: string) => void,
  
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