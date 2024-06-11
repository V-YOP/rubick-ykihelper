个人使用的 Rubick 的插件，使用 `vite` + `ts` + `react` ，可以作为插件的模板，`system`下为系统插件源码，`src`目录下为页面代码，`preload`目录下为预加载脚本。

# usage

clone下来后，***似乎应当修改electron版本和 rubick 的一致，避免node多次加载electron依赖？***，执行：

```bash
npm i
npm run build
```

然后在rubick的“开发者”设置中引入该目录的`dist`文件夹即可。

安装后如果没有启动，可能是rubick生成了错误的快捷方式，检查 `C:\Users\<你的用户名>\AppData\Roaming\rubick\rubick-plugins-new\node_modules`下指向该插件的快捷方式是否能打开，如果不能打开，移除该快捷方式并在cmd中手动创建链接：

```cmd
mklink /D rubick-ykihelper C:\路径\到你的\项目的\dist
```

