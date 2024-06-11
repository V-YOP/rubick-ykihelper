

type RubickAPI = {
  onPluginReady(cb: (ctx: RubickContext) => void): void,
  onPluginOut(cb: () => void): void,
  setSubInput: (onChange: (value: {text: string}) => void) => void,
  setSubInputValue: (value: string) => void,
}

type RubickContext = {
  code: string,
  type: "text" | "img" |  "files" |  "regex" |  "over" | "window",
  payload: any,
}

declare global {
  interface Window {
      rubick: RubickAPI
  }
}

export {
  RubickContext
}