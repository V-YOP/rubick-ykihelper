个人用 Rubick 插件，同时包含系统插件和 UI 插件逻辑。使用 `vite` + `ts` + `react` ，`system`下为系统插件源码，`src`目录下为页面代码，`preload`目录下为预加载脚本。

# usage

clone 下来后，***似乎应当修改 electron 版本和 rubick 的一致，避免 node 多次加载 electron 依赖？***，执行：

```bash
npm i
npm run build
```

然后在 `dist` 目录下执行 `npm link`，在 rubick 的“开发者”设置中引入该目录的`dist`文件夹即可。

安装后如果没有托盘通知，插件页面没有内容，可能是 rubick 生成了错误的快捷方式或者根本没有生成，检查 `%APPDATA%\rubick\rubick-plugins-new\node_modules`下指向该插件的快捷方式是否存在和能够跳转，如果无法跳转，移除该快捷方式并在 cmd 中手动创建链接：

```cmd
mklink /D %APPDATA%\rubick\rubick-plugins-new\node_modules\rubick-ykihelper C:\path\to\project\dist
```

# 更新

如果代码有修改（无论是系统插件、预加载脚本还是前端），执行 `npm run build` 即可。

如果`public/pacakge.json`有修改，需要在执行 `npm run build` 之后，在“开发者”中输入该目录的`dist`文件夹路径并点击“刷新插件”，然后重启rubick。

# TODO

- [ ] 打包时打开发环境的react，不然错误日志太简略
- [ ] 把tsconfig的配置掂量清楚，最小化
- [ ] 补充eslint等玩意
- [ ] 水一篇笔记