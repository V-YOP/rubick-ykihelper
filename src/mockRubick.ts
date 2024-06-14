// mock 用，必须最开始执行
(function () {
    if (window.isMock === false) {
        return
    }
    window.isMock = true
    // @ts-ignore
    window.rubick = {}
    // @ts-ignore
    window.api = {}
    window.api.whenReady = () => Promise.resolve({
        code: getMockCode(),
        payload: null,
        type: 'text'
    })
    window.api.whenOut = () => new Promise(resolve => {})
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
    window.rubick.isLinux = () => false
    window.rubick.isMacOs = () => false
    window.rubick.isWindows = () => true
    
})()


function getMockCode() {
    // 获取当前页面的URL
    const url = new URL(window.location.href);
    // 使用URLSearchParams解析查询参数
    const params = new URLSearchParams(url.search);
    // 获取特定的查询参数值
    const paramValue = params.get('c') ?? '';
    return paramValue
}