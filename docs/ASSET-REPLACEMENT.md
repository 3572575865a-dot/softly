# 可替换素材与视觉配置

当前图形、合成声音及材质均为占位资源。页面只引用共享组件和资源 ID，正式素材不写入页面。

## 替换入口

| 内容 | 文件 | 修改方式 |
| --- | --- | --- |
| Mascot 各状态素材 | `src/assets/config.js` → `mascot.urls` | 按状态填写图片 URL；未配置时使用共享占位图形 |
| Mascot 占位图形 | `src/assets/mascot-placeholder.js` | 统一替换共享结构 |
| 音乐、音效、名称、分类、音量 | `src/assets/config.js` → `audio` | 为现有资源 ID 配置 `url`，替代合成占位声音 |
| 各呼吸法音乐 | 同上 → `breatheMusic` | 呼吸法 ID 映射到音频 ID，`none` 为静音 |
| Gummy 轮廓、表情 | 同上 → `gummy.shape`、`gummy.faces` | SVG path；默认路径位于 `gummy-placeholder.js` |
| Gummy 材质 | 同上 → `gummy.material` | 透明度、描边、高光、渐变过渡、表情色彩 |
| 12 种情绪色 | `src/assets/emotion-palette.js` | Week / Month / Year 共用 |
| 功能动效时长、物理参数、尺寸比例 | `src/assets/config.js` → `motion`、`physics`、`gummyLayout` | 共享配置，按罐子尺寸计算 |
| 基础视觉 tokens | `src/design/tokens.css` | 背景、文字、玻璃、圆角、间距、阴影 |
| 装饰色与 CSS 动效时长 | `src/assets/theme.css` | 集中 CSS 变量；组件样式保留动画结构 |
| Mascot 各状态动画结构 | `src/design/mascot.css` | 统一组件，无需修改页面 |

例如，将音频文件放在项目 `assets/audio/rain.mp3`，设置 `assets.audio.rain.url` 为 `/assets/audio/rain.mp3`。Mascot 可设置 `assets.mascot.urls.sleeping` 为 `/assets/mascot/sleeping.svg`。素材路径相对站点根目录；修改后刷新预览。

图片应保持透明背景及一致画布；Gummy path 使用现有 `0 0 100 90` 坐标系。需要改变整体渲染技术时，替换共享 mascot / gummy 组件，页面及 Mood 数据逻辑保持独立。

音频由统一播放器管理，停止或离开页面会释放播放资源。只有实际播放成功才记入 Home 每日圆环；加载失败、自动播放受阻或开始前取消均不会记入。当前不包含正式音乐版权素材。

## Home 最新行为

- Brain Dump：空白禁用 OK；保存后收起键盘、柔和返回 Home、显示气泡。无成功提示。
- 气泡仍遵循独立的滚动 24 小时保存期限。
- 圆环只分空 / 满：本地当天完成一次呼吸或成功开始播放声音即满，无最低收听时长，无次数累加。
- 首次填充默认 1.9 秒；本地午夜清空。双击和长按 3 秒入口保持原行为。
- 此规则覆盖 `HOME-24H.md` 旧版圆环的四档、滚动 24 小时及收听时长规则。
