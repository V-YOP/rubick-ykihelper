/*

Commander 交互逻辑：
1. 预定义一些命令，在subinput中输入命令
2. 键入时，底部显示前缀匹配的命令列表（显示命令名，logo，描述），可以按上下键切换，按回车选择命令，按 TAB 补全到当前所有匹配命令的最长公共前缀
3. 选择命令后，如果命令无参数，直接执行它；如果有参数，setSubInput为命令（前缀一个#？）并插入空格，要求用户开始输入参数
4. 选择命令后，窗口显示命令的相关信息如示例等（该界面由命令提供）；用户再次回车时，整个命令发送给相应业务函数去做操作
5. 命令执行完毕后，由命令决定是置空 subInput 还是直接退出

命令当前先写死

该界面不提供任何配置，配置一律通过 Setting
*/

type CommanderOption = {
    ctx: RubickContext
}
export default ({ctx}: CommanderOption) => {

    return (
    <>
    It's Commander
    </>
    )
}