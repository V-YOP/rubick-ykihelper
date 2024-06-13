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
        code: 'aa',
        payload: null,
        type: 'text'
    })
    window.api.onePlusOne = () => 2
    
    let subInputCb: (v: {text: string}) => void = () => {}
    window.rubick.setSubInput = cb => {
        subInputCb = cb
    }
    window.rubick.setSubInputValue = v => {
        subInputCb({text: v})
    }
    window.rubick.onPluginOut = () => {}
    window.rubick.showNotification = msg => {
        alert(msg)
    }
    window.rubick.setSubInputValue(window.location.hash)
})()