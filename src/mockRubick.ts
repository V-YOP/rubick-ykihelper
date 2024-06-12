// mock 用，必须最开始执行
(function () {
    if (window.isProd) {
        return
    }
    // @ts-ignore
    window.rubick = {}
    // @ts-ignore
    window.api = {}
    window.api.whenReady = () => Promise.resolve({
        code: 'hello',
        payload: null,
        type: 'text'
    })
    
    let subInputCb: (v: {text: string}) => void = () => {}
    window.rubick.setSubInput = cb => {
        subInputCb = cb
    }
    window.rubick.setSubInputValue = v => {
        subInputCb({text: v})
    }
})()