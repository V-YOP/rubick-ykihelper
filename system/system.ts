import {Notification, app} from 'electron'
import _ from 'lodash'
import { writeFileSync } from 'original-fs';

// 初始化逻辑，状态等在这里放着
// ...

function getObjectStructure(obj: any) {
    if (!obj) {
        return 'null';
    } else if (Array.isArray(obj)) {
        return 'array';
    } else if (typeof obj === 'object') {
        const result = {};
        for (let key of Object.keys(obj)) {
            // @ts-ignore
            result[key] = getObjectStructure(obj[key]);
        }
        return result;
    } else {
        return typeof obj;
    }
}


module.exports = () => ({
    onReady(ctx: any) {
        // Electron app.on('ready') 函数执行期，会做一些更新检测、创建系统菜单、创建主窗口等操作
        new Notification({
            title: 'Hello, World!',
            // 第三方node库测试
            body: `ykihelper setup. 1 + 1 = ${_.add(1, 2)}`
        }).show()
        const r = getObjectStructure(ctx)
        const p = 'D:/DESKTOP/CODES/rubick-ykihelper/system/h.json'
        writeFileSync(p, JSON.stringify(r))

    },
    // rubick 只支持 onReady .............    
    // beforeReady() {
    //     throw new Error('!')
    //     // Electron App 启动前的准备工作，执行在 Electron 钩子函数 app.on('ready') 之前
    // },
    // onRunning() {
    //     throw new Error('!')
    //     // 处理 Electron 的 app.on('second-instance') 钩子函数和 app.on('activate') 钩子函数
    // },
    // onQuit() {
    //     throw new Error('!')
    //     // 处理 Electron 的 app.on('window-all-closed') 钩子函数和 app.on('will-quit') 钩子函数
    // }
})