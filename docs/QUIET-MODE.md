# 2026-09-16 · Custom / Sound / Overstimulation 更新

此说明覆盖之前冲突的规范。

- 呼吸节奏和音乐设置仅在选择 Custom 后出现。普通呼吸法读取自身的 music 配置，未配置时静音，不继承 Custom 的音乐。
- Sound 分类：White Noise / Soft Music / Hz / ASMR。Brown Noise、Rain、Ocean 归入 White Noise。ASMR 暂无音源，显示真实空状态。
- Overstimulation 在原 Home DOM 内完成 home → longPressPreparing → overstimulation → returningHome，不重建 Home。
- 按住 3 秒逐渐淡化、模糊周围 UI；提前松开、移动超过 14px、取消触摸、失焦或切后台均取消。双击仍进入 Brain Dump。
- 激活时仅调用一次可选轻震动；Web 振动支持依设备/浏览器，尚未验证 iPhone 原生震感。
- 保持原 mascot，缓慢居中略放大。提示 Nothing to do right now. 淡入、停留后淡出；10 秒微小形变周期，30/60/120 秒轻微放松。无进度、计时器、呼吸指令或完成状态。
- 默认静音。点 mascot 外背景显示 Sound Off / Exit，5 秒后隐藏。Sound On 为低音量稳定 Brown Noise；退出停止。
- 触摸 mascot 微小形变；退出在 1.2 秒内恢复原页面与滚动位置。键盘 Space 长按进入、Tab 显示控制、Escape 退出。
- Reduce Motion 禁用 mascot 动画与位移，保留低刺激淡入淡出。

验证范围：浏览器进入安静模式和视觉检查；自定义呼吸及阶段逻辑测试通过。手机触摸手感、震动和声音品质仍需真机确认。
