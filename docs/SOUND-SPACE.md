# Sound Space + My Music

## 当前交付

- 四个内置分类：Frequency / White Noise / ASMR / Soft Music。My Music 是独立个人区。
- 内置资源继续使用共享占位音频；ASMR 分类保留，等待正式音源。替换资源无需改页面。
- 点击曲目直接尝试播放，成功后进入无 mascot 的 Sound Space；失败可重试或退出。
- 同时只有一首音频。触碰仅产生视觉涟漪，不产生音频。
- 收藏共用持久状态，在所属分类或 My Music 内按最近收藏优先；取消后恢复原始顺序。

## My Music

Web 项目通过系统文件选择器导入用户明确选择的文件。iPhone 浏览器会使用系统文件选择界面；本项目没有原生 AVFoundation / Application Support 层。

导入 → 浏览器验证音频可读取 → 选择六个视觉之一 → 保存 → 返回列表，不自动播放。

音频 File/Blob 和记录存入 IndexedDB，并非只保存临时 URL。播放时才创建临时 Blob URL，退出时释放。刷新和重开同一站点后可继续使用；清除站点数据、浏览器存储回收或隐私模式限制仍可能清除副本。文件不上传，原始外部文件不修改或删除。格式支持由当前浏览器实际解码结果决定，不承诺所有 MP3/M4A/AAC/WAV 编码变体。

管理仅有 Favorite / Rename / Change Visual / Remove。移除仅删除本应用保存的副本。默认导入上限在配置中为 150MB，避免意外大文件导致内存问题；失败可重新选择。

## 播放与计时

- 内置默认 Until I stop。
- My Music 默认 Play Once；Loop 重复当前曲目；Continuous 按当时的可见排序寻找下一首，最后一首后停止，不循环列表。
- 每首导入曲目单独保存偏好。连续播放期间保持当前 Continuous 会话语义，同时每首使用自己的视觉。
- Timer 独立于模式。Play Once 文件结束不会为满足更长 Timer 重播。
- Frequency 快捷时间 1 / 3 / Custom，保留 Until I stop。
- 其余内置与 My Music 时间 10 / 15 / 30 / 60 / Custom / 无时限。
- Timer 使用一份墙钟截止时间，暂停或切后台后仍计算截止时间，不重复创建或重启。
- 退出和 Timer 结束默认 900ms 淡出；无完成奖励界面。
- 进入后台暂停音频并保留当前媒体位置，前台由用户 Resume。媒体暂停、错误和 AudioContext 中断独立于自然结束，不会触发 Continuous 前进。未新增后台播放权限。
- 仅实际成功开始播放调用现有 Home Sound 事件；导入、收藏、编辑、选 Timer 或模式不调用。圆环仍是空 / 满。

## 配置与复用

- `src/assets/config.js` 的 `audio`：正式音源 URL、音量、分类、名称。`visualPreset` 可为某一音源指定空间。
- `src/assets/sound.js`：视觉映射、个人视觉选项、播放模式标签、路径、材质、动态幅度、淡出/过渡时间与导入限制。
- `src/components/sound-world.js`：内置与 My Music 共用一个有上限的 SVG 视觉系统；不分析频谱或节拍。支持减少动态效果，后台停止渲染。
- `src/assets/audio-player.js`：共享的音频适配器，保留 Breathe / Mood 现有调用形式，增加 pause/resume/loop/fade/自然结束/中断接口。媒体通过 GainNode 淡出，兼容不允许直接调整媒体音量的环境。
- `src/features/sound-engine.js`：唯一播放会话、模式、Timer 和完成事件管理。
- `src/features/sound-data.js`：本地副本、元数据、收藏排序。
- `src/features/sound-view.js`：浏览、导入、管理及沉浸 UI。

## Guided Flow 边界

当前仓库没有 Guided Flow 序列编辑器/播放器，因此没有新增该页面。

现有 `soundFeature.sources()` 返回内置与个人音频来源；宿主选一个来源，调用 `soundFeature.play(track,{guided:true,duration:2,onReturn})` 即可复用整个 Sound Space。有限 Flow 时间临时 loop 当前音频直至该时间结束；不改写用户正常播放偏好。`duration:0` 表示无限且不自动推进，适合作为末步。Skip / Exit / Timer 结果通过 `onReturn({reason})` 返回，下一步由宿主决定。两类来源均调用同一个 Home Sound 事件。

## 验证

自动测试覆盖：收藏排序与恢复、来源默认语义、分类 Timer、实际播放成功事件、失败/取消、不为较长 Timer 重播、Continuous 动态排序/不绕回、中断不跳曲、计时期限、Flow 临时循环不修改偏好、单播放实例，以及原 Breathe/Mood/Home 测试。

浏览器验证：导入 WAV 后不自动播放；刷新后可播放且模式保留；损坏 WAV 拒绝；重命名/换视觉/收藏；Play Once 自然停止；Loop 持续；Continuous 实际切换至下一首自己的视觉；Frequency 与个人 Timer 选项；402×874 手机尺寸检查。尚未进行 iPhone 真机的电话、耳机断开及各编码格式验证。
