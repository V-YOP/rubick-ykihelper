// mock 用，必须最开始执行
(function () {
    if (window.isMock === false) {
        return
    }
    window.isMock = true
    
    let isDarkMode = false
    window.api = {
        whenReady: () => Promise.resolve({
            code: getMockCode(),
            payload: null,
            type: 'text'
        }),
        // never resolve( TODO 网页unload时resolve？)
        whenOut: () => new Promise(resolve => {}),
        onePlusOne: () => 2,
        detachMe: () => {},
        isDarkMode: () => isDarkMode,
        setDarkMode: d => {isDarkMode = d}
    }
    
    // @ts-ignore
    window.electron = {}
    
    let subInputCb: (v: {text: string}) => void = () => {}
    // @ts-ignore
    window.rubick = {
        setSubInput: cb => {
            subInputCb = cb
        },
        setSubInputValue: v => {
            subInputCb({text: v})
        },
        onPluginOut: () => {},
        showNotification: msg => {
            alert(msg)
        },
        isLinux: () => false,
        isMacOs: () => false,
        isWindows: () => true,
        getPath: (n) => n,
        hideMainWindow: () => {},
        outPlugin: () => window.close(),

    }
    
    
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