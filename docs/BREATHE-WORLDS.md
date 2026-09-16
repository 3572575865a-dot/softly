# Breathe · Immersive Breathing Worlds

本规范覆盖旧的单一呼吸圆球、Custom 音乐选择和立即截断计时行为。仅更新 Breathe 与现有 Home 完成事件接线。

## 体验

选择六种方法或 Custom Breathing → 时长 → 3 秒准备 → 沉浸视觉。选择页保留共享 breathing mascot；沉浸页不显示 mascot。

| 方法 | 阶段（秒） | 视觉 |
| --- | --- | --- |
| Box | 4 / 4 / 4 / 4 | 柔和空心方框，四边光线 |
| 4–7–8 | 4 / 7 / 8 | 弹性胶囊 |
| Coherent | 5 / 5 | 呼吸球、两层微弱涟漪 |
| Physiological Sigh | 3 / 1 / 6 | 两个气泡融合并消散 |
| Slow | 4 / 6 | 连续丝带 |
| Sleep | 4 / 8 | 低亮度月弧起落 |
| Custom | 吸气 / 可选停留 / 呼气 / 可选停留 | 复用呼吸球 |

Sigh 的 3 / 1 / 6 是应用节奏，不作为医学规定。默认静音，不提供声音选择，不使用震动。

## 计时与交互

- 唯一单调时钟驱动阶段、整数倒数及视觉。五个完整 cycle 后淡出提示；中央视觉点击后召回 6 秒，阶段不中断。
- 点击空白显示 Pause / End，3 秒后隐藏；键盘聚焦时保持可见。Escape 可召回并聚焦控制。
- Pause 立即保存精确逻辑时间，视觉约 400ms 内柔和停下。Resume 续接原时间。
- 页面隐藏、窗口失焦或系统页面离开时暂停；回来后 Continue。
- 定时目标向上对齐完整 cycle。结束时柔和消散，再显示 “That’s enough for now.” 约 2 秒。
- 定时完整结束才触发完成事件；提前 End / Skip 不计完成。无时限在至少完整一轮后主动 End 计完成，保持原来的开放式完成语义。
- Home 圆环继续使用已有本地日空 / 满逻辑，不累加。
- Reduce Motion 使用更小位移和缩放，保留六种形态。固定少量 SVG 对象，无粒子或物理循环堆积。

## 文件与配置

- `src/features/breathe.js`：方法元数据、阶段、可注入时钟的 session engine。
- `src/assets/breathing.js`：占位 SVG path、材质、视觉运动幅度、准备/显隐/停止时长、静音音频配置。
- `src/components/breathing-world.js`：共享视觉适配器；所有世界从同一个 session 状态绘制。
- `src/features/breathe-view.js`：准备、控制、暂停、中断、结束、无障碍状态。
- `src/design/breathe.css`：Breathe 专用布局与视觉结构，复用全局 tokens。

替换正式素材时编辑配置里的 world path 或共享 renderer；不要把图形/声音写进页面。背景音通过 `audio.backgroundTrack` 引用共享 audio asset ID，默认 `enabled:false`。阶段音效字段仅作为未来接入点保留，本版不播放。音频失败不会阻塞计时。

## Guided Flow 集成边界

当前项目尚无 Guided Flow 序列播放器，本次不创建该功能，也不把 Custom Breathing 变成活动序列。

复用 `breathingSessionView({root,mount,method,minutes,guided:true,onComplete,onReturn,onSkip})`。`guided:true` 提供 Skip；Skip 先消散并显示 “Stay here.”，再调用宿主的下一步回调。宿主负责下一世界 / Sound Space 的进入过渡，并使用现有完成事件回调；不应另写计时或动画循环。返回的函数用于卸载时清理动画、声音、事件和所有定时器。

## 验证

自动测试覆盖各法阶段边界、五轮边界、精确暂停续接、准备期间中断、完整 cycle 结束、取消/Skip 不计完成、无时限完成。浏览器检查包含手机 402×874 视口、专属准备提示、Pause / End、自定义节奏及提示召回。未进行 iPhone 真机测试。
