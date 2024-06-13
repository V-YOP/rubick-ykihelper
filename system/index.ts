import { type Notification, type shell } from "electron"

// 不要在这里塞任何逻辑（包括import！！）！！！这里抛出异常会直接导致rubick启动失败
// 不要在这里塞任何逻辑（包括import！！）！！！这里抛出异常会直接导致rubick启动失败
// 不要在这里塞任何逻辑（包括import！！）！！！这里抛出异常会直接导致rubick启动失败
// 但import type是可以的，编译成js会抹掉
// 逻辑写在 system.ts 中，它的加载会延迟以捕获相应异常并抛出

module.exports = () => {
    const {writeFileSync} = require('fs')
    const path = require('path')
    function writeError(name: string, error: any) {
        const targetDir = path.dirname(__filename)
        const targetFile = path.join(targetDir, name + '.error.log')
        let target: string
        if (error instanceof Error) {
            target = `${new Date().toLocaleString()}\n${error.name}: ${error.message}\n${error.stack}\n${error.cause}`
        } else {
            target = error + ''
        }
        writeFileSync(targetFile, target)
        return targetFile
    }

    let hooks: any;
    try {
        hooks = require('./system')();
    } catch (e) {
        const error = e as Error
        return {
            onReady(ctx: any) {
                const Notification_ = ctx.Notification as typeof Notification
                const shell_: typeof shell = ctx.shell 
                const notify = new Notification_({
                    title: 'ykihelper init failed!' ,
                    body: error.name + ": " + error.message + '. Click Me To see details'
                })
                const targetFile = writeError('init', e)
                notify.on('click', () => {
                    shell_.openPath(targetFile)
                })
                notify.show()
            }
        }
    }
    return {
        onReady(ctx: any) {
            try {
                hooks.onReady()
            } catch (e) {
                const error = e as Error
                const Notification_ = ctx.Notification as typeof Notification
                const shell_: typeof shell = ctx.shell 
                const notify = new Notification_({
                    title: 'ykihelper onReady failed!' ,
                    body: error.name + ": " + error.message + '. Click Me To see details'
                })
                const targetFile = writeError('onReady', e)
                notify.on('click', () => {
                    shell_.openPath(targetFile)
                })
                notify.show()
            }
        },
        // beforeReady() {
        //     try {
        //         hooks.beforeReady()
        //     } catch(e) {
        //         writeError('beforeReady', e)
        //     }
        // },
        // onRunning(ctx: any) {
        //     try {
        //         hooks.onRunning()
        //     } catch (e) {
        //         const error = e as Error
        //         const Notification_ = ctx.Notification as typeof Notification
        //         const shell_: typeof shell = ctx.shell 
        //         const notify = new Notification_({
        //             title: 'ykihelper onRunning failed!' ,
        //             body: error.name + ": " + error.message  
        //         })
        //         const targetFile = writeError('onRunning', e)
        //         notify.on('click', () => {
        //             shell_.openPath(targetFile)
        //         })
        //         notify.show()
        //     }
        // },
        // onQuit() {
        //     const {Notification, shell} = require('electron')
        //     try {
        //         hooks.onQuit()
        //     } catch(e) {
        //         const error = e as Error
        //         const notify = new Notification({
        //             title: 'ykihelper onQuit failed!' ,
        //             body: error.name + ": " + error.message  
        //         })
        //         const targetFile = writeError('onQuit', e)
        //         notify.on('click', () => {
        //             shell.openPath(targetFile)
        //         })
        //         notify.show()
        //     }
        // }
    }
}