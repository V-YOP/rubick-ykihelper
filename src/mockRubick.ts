

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
    
    let subInputCb: (v: {text: string}) => void = () => {}
    window.rubick.setSubInput = cb => {
        subInputCb = cb
    }
    window.rubick.setSubInputValue = v => {
        subInputCb({text: v})
    }
})()