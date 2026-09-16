> 历史规范：圆环与 Brain Dump 保存流程已由 [最新规则](ASSET-REPLACEMENT.md#home-最新行为) 覆盖。

# Home · 24 小时记忆与调节痕迹

当前规范，覆盖旧的始终显示装饰气泡、Brain Dump 仅 tab scratchpad 的描述。

## 独立状态

- 气泡：只有未到期 Brain Dump 时创建独立按钮，不嵌套在 mascot 按钮内。保持原位置和淡粉半透明外观，无可见图标或文字。点击打开同一个 Brain Dump。
- 圆环：依据最近 24 小时的有效 Breathe / Sound 事件，内部上限四档。只以乳白弧线表现，不显示数值、目标或完成提示。回 Home 时缓慢过渡 1.4 秒。

## 笔记

唯一数据源仍为 `softly-dump`，已从旧 sessionStorage 文本升级为 localStorage 的 `{id, content, type, createdAt, expiresAt}`。首次输入非空文字创建；后续编辑保留原创建/到期时间。空白或 Let it go 清除。到期自动删除，不进入 Mood。Home 打开时到期会先淡出气泡；在后台时，下次聚焦/显示即检查。

旧 tab 草稿没有时间戳，首次升级时以迁移时刻开始 24 小时，不凭空推断旧创建时间。浏览器存储不可用时退化为当前运行期内存；语音仍未实现，未新建另一套语音入口。

## 事件

`softly-regulation-events-v1` 存 `{id,type,createdAt}` 数组。没有持久化 ringProgress。时间窗口使用严格 `timestamp > now - 24h`，不是午夜重置。

- 定时 Breathe：达到所选时长才记录；倒计时或提前结束不记录。
- No limit Breathe：至少完成一个完整 cycle 后手动结束，计入一次。
- Sound：同一播放页累计真实 AudioContext 播放 30 秒计入一次；暂停不计时，恢复不重复计数，音频未运行不计入。依据既有播放/暂停/结束位置接入，不增加第二个播放系统。
- 每次会话拥有稳定 id，重复回调去重。过期事件清理；声音和笔记互不影响。

## 兼容与验证

保留双击 Brain Dump、长按三秒进入 Overstimulation；安静模式期间气泡隐藏且不可点击。Reduce Motion 跳过漂浮和弧线动画。

自动测试覆盖到期边界、午夜前后、笔记编辑不续期、事件去重、四档封顶、四种独立组合。浏览器验证双击→文本→Home 气泡→点击重开原文本；使用 127.0.0.1 独立存储测试，不写用户 localhost 数据。
