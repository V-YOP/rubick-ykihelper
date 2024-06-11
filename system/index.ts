import {writeFileSync} from 'fs'
import path from 'path'
import {Notification, app} from 'electron'


// 不要在这里塞逻辑！！！这里抛出异常会直接导致rubick启动失败
const SCRIPT_DIR = path.dirname(__filename)
// 检查脚本是否正确执行
writeFileSync(path.join(SCRIPT_DIR, 'checkIfLaunch'), __filename)

module.exports = () => {
    return {
        onReady() {
            app.getPath('userData')
            new Notification({
                title: 'Hello, World!',
                body: '成功了成功了成功了, userDataPath: ' + app.getPath('userData')
            }).show()
        }
    }
}