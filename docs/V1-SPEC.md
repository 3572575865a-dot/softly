# Softly · V1 Product / UX / UI 开发规范

## 基准与本轮范围

2026-09-15。基于用户最终文字要求及原对话 Home 参考图。Softly 是开发暂用名称。原图的粉灰玻璃材质与层级延续；Routine、Me、等级及连续记录奖励不进入当前四页结构。数值是本轮落地参数，并非声称原图提供了精确数值。

交付阶段：Design System + 可运行 Home MVP。采用无第三方运行依赖的模块化 Web App，可在 iPhone Safari 打开。不是已打包的 iOS 原生应用。后续可在确定原生交付要求后加容器或迁移渲染层。

## 产品结构

- Home：问候、三个情景入口、中央 mascot、Breathe / Sound / Mood 功能卡、四项底部导航。
- I'm anxious → 默认 Gentle breathing，用户确认时间后开始。
- I can't sleep → Sound 的 White Noise 分类。
- Quiet my mind → Brain Dump。
- Mascot 双击 → Brain Dump；连续按住 3 秒 → Overstimulation。滑动超过 14px、取消触摸或失焦取消长按；键盘 Enter / 长按 Space 提供等效入口。
- 不设 Routine，不新增账号、订阅或社交页面。

## 视觉与组件

目标逻辑画布 402 × 874 CSS px；响应式支持 320px 起。真实安全区使用 env(safe-area-inset-*)，不伪造系统状态栏。页面边距 24px，底部为固定导航预留 110px + 安全区。

| Token | 值 |
|---|---|
| 背景 | #E9E5E6，叠加低透明度灰粉、灰蓝雾光 |
| Glass | rgba(255,253,250,.40)，blur 24px |
| Milk | rgba(255,253,250,.66) |
| 边缘 | rgba(255,255,255,.75)，1px |
| 主文字 / 次文字 | #454650 / #73727D |
| Breathe / Sound / Mood Accent | #A6B9CE / #BEB3CB / #D6B2BE |
| 圆角 | 16 / 28 / 999px，场景卡 24px |
| 阴影 | 0 8px 28px rgba(92,77,87,.055) + 乳白内高光 |
| 间距 | 4 / 8 / 12 / 16 / 24 / 32 / 48px |
| 字体 | 系统字体，iOS 使用系统 San Francisco |
| 页面标题 / 正文 / 辅助 | 34 / 15 / 12px，首页辅助提示最小 10px |
| 触摸区域 | 至少 44 × 44px |
| 过渡 | 240ms；陪伴浮动 6s，安静模式 10s |

组件边界：Glass 表面、场景按钮、功能卡、BottomNav、IconButton、Mascot、呼吸会话。Mascot 当前是 CSS 简化造型；不是原图毛绒角色最终复刻。正式动画可替换 mascot.js 的内部视觉，保持外层交互协议。尊重 prefers-reduced-motion。

## Breathe

选择呼吸法 → 时长 → 3 秒倒计时 → 会话 → 结束。支持 1 / 3 / 5 分钟、No limit、自定义 1–120 分钟。当前呼吸法：4/6、4/4/4/4、4/4。计时基于 elapsed time，避免 setInterval 累积漂移；后台返回按实际经过时间定位。

前五个完整 cycle 显示每个阶段 Inhale / Hold / Exhale；第六个开始只留呼吸视觉及退出按钮。Hold 维持当前尺寸。任何阶段可结束。No limit 持续到手动结束。复杂呼吸视觉和后台运行保障留待下一阶段。

## Sound（完整 V1 合约，当前为页面骨架）

Frequency / White Noise / ASMR / Soft Music 分类快速定位到连续列表；每个声音提供名称、试听、选择。选择后进入沉浸播放，保留视觉和 Timer。Timer 支持关闭、预设、自定义、到期渐弱停止。退出沉浸页的播放行为必须显式定义；同时最多播放一个声源。下一阶段接入合法授权音源、音量、播放失败和移动端音频解锁处理。当前没有音频播放，不能用静态按钮声称已经播放。

## Mood（完整 V1 合约，当前为页面骨架）

Week / Month / Year + 日期入口。每日最多三种情绪、无数字比例 slider、可选文字。选中情绪的权重归一化至和为 1；总权重为零时均分。同一天编辑覆盖，不重复计数。并列最高权重时按用户选择顺序确定表情，保持稳定。

当天生成 mascot 头形 gummy，色彩按权重混合，主情绪控制表情。未记录日显示透明 gummy，不能当作 Numb 或零分加入聚合。月/年先对每个已记录日归一化，再对已记录日等权求均值；没有记录时显示空状态。Week 展示每日 gummy；Month / Year 展示少量大型 gummy 和无数字比例条。用本地日期作为键，避免 UTC 引起跨日。

| Emotion | HEX |
|---|---|
| Happy | #F7E289 |
| Calm | #35C8B4 |
| Loved | #EA5E86 |
| Energized | #FEF6F1 |
| Content | #EA9B90 |
| Dreamy | #DBC0E8 |
| Sad | #A2BECC |
| Anxious | #5F86A6 |
| Angry | #243A5E |
| Stressed | #BA70A1 |
| Numb | #816684 |
| Drained | #CFE3F1 |

这些颜色仅用于情绪表达，不提升全局背景饱和度。颜色始终伴随文字标签。

## 隐藏功能

Brain Dump：文本 scratchpad 已实现。输入按当前 tab 的 sessionStorage 暂存，Let it go 清除草稿；不是永久日记，不发送到服务器。存储不可用时提示仅当前屏幕保留。语音输入为下一阶段：需实际录音权限、取消/停止、失败提示与清除行为。

Overstimulation：主 UI 隐去，只保留慢速 mascot 与低存在感退出按钮。没有任务、选择、数据和进度；Escape 也能退出。减弱动态偏好下静态陪伴。

## 维护与下一阶段

src/design/tokens.css 为视觉唯一来源；components/ 保存可替换视觉；features/breathe.js 为可独立验证的会话逻辑；app.js 编排页面，后续增量拆分各 feature 的视图和存储适配层。新增 Mood 使用版本化本地记录与独立聚合纯函数。正式 mascot、呼吸和 gummy 动效不能直接侵入业务数据层。

验收顺序：Home 手势与导航 → Breathe 时间/阶段 → Sound 音频 → Mood 数据与聚合 → 正式角色和液体动效 → iPhone Safari 真机、安全区、VoiceOver、后台恢复验证 → 原生分发决策。
