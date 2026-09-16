# Softly · Home MVP

最新素材配置与 Home 行为见 [素材替换说明](docs/ASSET-REPLACEMENT.md)。

## 运行

需要 Node.js。在这个目录运行 `node server.mjs`，打开 http://localhost:4173 。不需要安装依赖。同一网络的 iPhone 可打开电脑的局域网 IP 加 `:4173`（需要网络和防火墙允许）。不要直接双击 index.html，浏览器模块需要 HTTP 服务。

## 当前可用

- Home 三个情景入口、四页导航、玻璃组件和独立 Design Tokens。
- Mascot 双击 Brain Dump、长按 3 秒进入安静模式；键盘等效操作。
- 呼吸法、预设/自定义时长、3 秒倒计时、五个 cycle 后隐藏阶段文字、结束。
- Brain Dump 文本与当前 tab 草稿；Overstimulation 简化陪伴动画。

Sound / Mood 当前是明确标识的页面骨架。真实音源、Timer、Mood 记录/比例/gummy/聚合、语音和正式角色动画尚未实现。完整要求见 docs/V1-SPEC.md。当前是移动 Web 项目，尚未打包为原生 iOS App，未完成 iPhone 真机测试。

验证：`node --test src/features/breathe.test.js`。
