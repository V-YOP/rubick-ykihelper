import {writeFileSync} from 'fs'
import path from 'path'
import {Notification} from 'electron'

const SCRIPT_DIR = path.dirname(__filename)
// 检查脚本是否正确执行
writeFileSync(path.join(SCRIPT_DIR, 'checkIfLaunch'), __filename)
module.exports = () => {
    return {
        onReady() {
            new Notification({
                title: 'Hello, World!',
                body: '失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了'
            }).show()
        }
    }
}