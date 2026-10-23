const STORAGE_KEY='softly-language-v2';
const listeners=new Set();
const messages={
 en:{'mood.aggregate.week':'Week {{number}}'},
 'zh-CN':{
  'Softly — a moment for you':'Softly — 给自己片刻','A LITTLE SPACE FOR YOU':'给自己留一点空间','Home':'首页','Breathe':'呼吸','Sound':'声音','Mood':'心情',
  'Good morning':'早上好','Good afternoon':'下午好','Good evening':'晚上好','It’s okay to':'放松一下','take a moment.':'给自己一点时间。','A softer mind, a kinder you.':'让心柔软一点，对自己温柔一点。','How can we help?':'现在想做什么？','I’m anxious':'我有些焦虑','Tap It Out':'敲一敲','Quiet my mind':'让心安静','Custom':'自定义','Here with you.':'我会陪着你。','Double tap to let it out · Hold to slow down':'双击释放情绪 · 长按慢下来','Sound On':'声音开启','Quiet On':'静音开启','Toggle global quiet':'切换全局静音','Switch to Simplified Chinese':'切换至简体中文','Switch to English':'切换至英文',
  'Follow your breath':'感受呼吸','Back to methods':'返回方法','Your rhythm · seconds':'你的节奏 · 秒','Inhale':'吸气','Exhale':'呼气','Hold':'屏息','Hold after inhale (optional)':'吸气后屏息（可选）','Hold after exhale (optional)':'呼气后屏息（可选）','Inhale again':'再次吸气','Reset':'重置','How long would you like?':'想练习多久？','Session duration':'练习时长','No time limit':'不限时间','Keep it comfortable. You can stop whenever you like.':'保持舒适，随时可以停止。','Begin':'开始','Set as Default':'设为默认','Home will start with this breathing exercise.':'首页将从这项呼吸练习开始。','Get ready':'准备好','Bring your attention to your breath.':'现在将注意力放在呼吸上。','In through your nose.':'用鼻子吸气。','Out gently through your mouth.':'用嘴轻轻呼气。','Keep it comfortable.':'保持舒适。','You don’t need to force the hold.':'不必勉强屏息。','End':'结束','That’s enough for now.':'做得不错。','Stay here.':'留在这里。','Continue':'继续','Paused.':'已暂停。','Paused. Continue when you’re ready.':'已暂停，准备好后继续。','Following your breath.':'跟随呼吸。','Preparing':'准备中','second':'秒','seconds':'秒',
  'Choose one sound. Enter its space.':'选择一种声音，进入它的空间。','Frequency':'频率','White Noise':'白噪音','ASMR':'ASMR','Soft Music':'轻音乐','Sounds for this space are coming soon.':'这里的声音即将上线。','My Music':'我的音乐','Your own sounds, your own space.':'你的声音，你的空间。','＋ Add Music':'＋ 添加音乐','Choose a local audio file':'选择本地音频文件','Favorite':'收藏','Manage':'管理','Rename':'重命名','Change Visual':'更换视觉','Remove':'移除','Opening your sound…':'正在打开声音……','Choose a space for this sound':'为这段声音选择空间','Liquid Light':'流动光影','Soft Waves':'柔和波浪','Drifting Mist':'漂浮薄雾','Soft Ripples':'柔和涟漪','Resonance Field':'共振场','No Visual':'无视觉效果','A name for this sound.':'给这段声音取个名字。','Sound name':'声音名称','Save':'保存','This audio is no longer available.':'这段音频已不可用。','This sound is coming soon. Its audio has not been added yet.':'这段声音即将上线，音频还未添加。','This sound could not be saved locally. Please try again.':'这段声音无法保存在本地，请重试。','Your music could not be loaded. Please try again.':'你的音乐无法加载，请重试。','Your saved music could not be opened.':'无法打开已保存的音乐。','The name could not be saved. Please try again.':'名称无法保存，请重试。','This sound could not be removed. Please try again.':'这段声音无法移除，请重试。','Your changes could not be saved. Please try again.':'更改无法保存，请重试。','This audio file isn’t supported.':'不支持此音频文件。','Choose a smaller audio file.':'请选择更小的音频文件。','Sound Space':'声音空间','Exit Sound Space':'退出声音空间','Playback progress':'播放进度','Playback Mode':'播放模式','Timer':'计时器','No Timer':'不设定计时','Until I stop':'直到我停止','Set Timer':'设定计时','Choose 1–1440 minutes.':'请选择 1–1440 分钟。','Play Once':'播放一次','Loop':'循环播放','Continuous':'连续播放','Playing':'播放中','Retry':'重试','Resume':'继续播放','Choose frequency':'选择频率',
  'LITTLE PIECES OF LIFE':'生活的小片段','How life felt.':'今天感觉如何？','Emotion Jar':'情绪罐子','Every feeling has a place here.':'每一种感受都有位置。','Week':'周','Month':'月','Year':'年','Today':'今天','Close':'关闭','Earlier':'更早','More':'更多','Little moments, held softly.':'把小小的时刻轻轻收好。','Each week leaves its own colors.':'每一周都有自己的颜色。','Each month, softly gathered.':'把每个月轻轻收集起来。','You don’t have to be consistent to come back.':'不必始终如一，也可以回来。','Nothing was recorded here.':'这里还没有记录。','What’s here today?':'今天有什么感受？','Choose up to three feelings. There’s room for all of them.':'最多选择三种感受，每一种都有位置。','Choose up to three feelings for this day.':'这一天最多选择三种感受。','Make it feel like you.':'调整它在你心里的分量。','Anything you want to remember?':'有什么想记住的吗？','Optional':'可选','A thought, a moment, or nothing at all…':'一个想法、一个片刻，或者什么都不写……','Delete':'删除','Delete this record permanently?':'永久删除这条记录？','Your feelings can land here.':'你的感受可以安放在这里。','You don’t have to be consistent to come back.':'不必始终如一，也可以回来。','This record could not be changed. Please reopen this day.':'这条记录无法修改，请重新打开这一天。','This memory could not be saved on this device. Your text is still here; please try again.':'这段记忆无法保存在此设备上，文字仍在，请重试。','Give at least one feeling a little room.':'至少给一种感受留一点位置。','A little':'一点','Some':'一些','A lot':'很多',
  'Happy':'开心','Calm':'平静','Loved':'被爱','Energized':'有活力','Excited':'兴奋','Hopeful':'充满希望','Sad':'难过','Anxious':'焦虑','Stressed':'压力','Angry':'生气','Numb':'麻木','Drained':'疲惫','Content':'满足','Dreamy':'梦幻',
  'TAP IT OUT':'敲一敲','Whatever it is, tap it out.':'无论是什么，敲出来吧。','LUCK ·':'好运 ·','patience +1':'耐心 +1','calm +1':'平静 +1','courage +1':'勇气 +1','softness +1':'柔软 +1','peace +1':'平和 +1','whatever that was +1':'无所谓 +1','letting go +1':'放下 +1','luck +1':'好运 +1','Back to Home':'返回首页','Tap TummyTummy for Luck':'敲一敲 TummyTummy，收集好运',
  'LET IT OUT':'释放出来','Leave these words here?':'要把这些话留在这里吗？','Keep writing':'继续写','Leave':'离开','Let it out.':'写下来吧','Let it out':'写下来吧','Still here.':'它还在这里。','You can leave it whenever you’re ready.':'准备好时，随时可以放下。','You don’t have to make sense here.':'在这里不必把一切说清楚。','Write whatever is on your mind…':'写下此刻脑海里的任何事……','Let it go':'放下','Keep this':'保留','It can stay here for 24 hours.':'它可以在这里停留 24 小时。','Copy Text':'复制文字','Share':'分享','Copied.':'已复制。','Select and copy your text.':'请选择并复制文字。','Sharing is unavailable right now.':'暂时无法分享。','You can leave it here.':'你可以把它留在这里。','Stay here':'留在这里','Go home':'回到首页','This is your space to let it out.':'这里是让你释放情绪的地方。','Write whatever is on your mind — messy, frustrated, unfinished, anything.':'写下脑海里的任何事——凌乱的、沮丧的、未完成的，都可以。','Nothing here needs to sound right.':'这里不需要说得完美。','Another text is being kept. Return home to open it.':'已有另一段文字被保留，请回到首页打开。',
  'Nothing to do right now.':'现在什么都不用做。','Sound Off':'声音关闭','Exit':'退出','Quiet Mode':'安静模式','All sounds will stay muted across the app.':'整个应用的声音都会保持静音。','You can still turn sound on temporarily':'你仍可以在任何页面暂时打开声音','inside any page.':'。','Got it':'知道了',
  'Custom Shortcut':'自定义快捷方式','Keep something you reach for close.':'把常用的体验放在身边。','Shortcut type':'快捷方式类型','Choose one experience':'选择一项体验','Experiences':'体验','Choose an icon':'选择图标','Shortcut icon':'快捷图标','Waves':'波浪','Moon':'月亮','Star':'星星','Circle':'圆形','Heart':'爱心','Cloud':'云朵','Leaf':'叶子','Flower':'花朵','Sparkle':'闪光','Sun':'太阳','Mountain':'山','Clover':'四叶草','Save Shortcut':'保存快捷方式','Opening your sounds…':'正在打开你的声音……','No sounds available here yet.':'这里暂时没有可用声音。','This shortcut could not be saved. Please try again.':'快捷方式无法保存，请重试。',
  'Brown Noise':'棕噪音','A soft, deep hush':'低沉柔和的底噪','Rain':'雨声','A light wash of sound':'轻柔的声音掠过','Ocean':'海浪','A slow, rolling rhythm':'缓慢起伏的节奏','Campfire':'篝火','A warm, gentle crackle.':'温暖轻柔的噼啪声。','Underwater':'水下','Muffled and quiet beneath the surface.':'水面之下，安静而朦胧。','Wind':'松风','A soft breeze passing through.':'柔和的风穿过。','Stream':'溪流','A steady flow of moving water.':'稳定流动的水声。','Brown Noise 2':'棕噪音 2','A warmer, deeper brown noise — like the quiet of a first-class cabin.':'更温暖深沉的棕噪音，像头等舱里的安静。','Relax & Work':'放松与专注','Gentle music for focus':'适合专注的轻柔音乐','Soft Pastel Flowers':'柔和的粉彩花朵','Relaxing piano for peaceful days':'适合安静日子的舒缓钢琴','Take It Slow Tonight':'今晚慢一点','A slower evening soundscape':'适合夜晚的慢节奏声音','Cotton Dreams':'棉花糖般的梦','A soft, dreamy melody':'柔和梦幻的旋律','Lo-fi Guitar for Sleepless Nights':'失眠夜里的 Lo-fi 吉他','Gentle guitar for quieter nights':'适合安静夜晚的轻柔吉他','Nervous System Regulation':'神经系统调节','A calm, steady soundscape':'平静稳定的声音空间','Peaceful Piano & Forest White Noise':'宁静钢琴与森林白噪音','Piano with a quiet forest atmosphere':'带有安静森林氛围的钢琴','A quiet ASMR moment':'一段安静的 ASMR','A steady, gentle tone':'稳定轻柔的音调',
  'A LITTLE SPACE FOR YOU':'给自己留一点空间','mood.aggregate.week':'第 {{number}} 周',
  'Slow Breathing':'慢呼吸','Slow Breathing · 4–6':'慢呼吸 · 4–6','Gentle Relaxation':'温和放松','A longer exhale to soften the pace.':'延长呼气，让节奏慢下来。',
  'Box Breathing':'方块呼吸','Box Breathing · 4–4–4–4':'方块呼吸 · 4–4–4–4','Focus & Grounding':'专注与安定','A steady rhythm to follow.':'跟随稳定的节奏。',
  '478 Breathing':'478 呼吸','4–7–8 Breathing':'4–7–8 呼吸','Sleep & Unwinding':'助眠与放松','Slow down before rest.':'睡前慢慢放松。',
  'Coherent Breathing':'协调呼吸','Coherent Breathing · 5–5':'协调呼吸 · 5–5','Everyday Balance':'日常平衡','An even, steady rhythm.':'均匀稳定的节奏。',
  'Physiological Sigh':'生理性叹息','For Tense Moments':'缓解紧绷','A quick way to slow things down.':'快速放慢节奏。',
  'Sleep Breathing':'睡眠呼吸','Sleep Breathing · 4–8':'睡眠呼吸 · 4–8','Bedtime':'睡前','Slow and quiet for winding down.':'缓慢安静地放松下来。',
  'Custom Breathing':'自定义呼吸','Your own rhythm':'自己的节奏','Make room for a comfortable pace.':'找到舒适的节奏。','Your own breathing pattern':'自己的呼吸节奏',
  'Choose a breathing method':'选择呼吸方法','Breathing methods':'呼吸方法','Minutes':'分钟','Pause':'暂停','Skip':'跳过',
  'Back home':'返回首页','Main navigation':'主导航','Dismiss gesture tip':'关闭手势提示',
  'Companion. Double tap or press Enter for Let It Out. Hold for 3 seconds or hold Space for a quiet moment.':'陪伴你的 TummyTummy。双击或按回车键进入释放空间；长按三秒或按住空格键进入安静时刻。',
  'Reveal current breathing phase and count':'显示当前呼吸阶段和倒计时','Mute sound for this session':'本次练习静音','Turn sound on for this session':'本次练习开启声音',
  'Your words':'你的文字','Your words are softly leaving':'你的文字正轻轻离开','Temporarily kept text':'暂时保留的文字','Remake':'重新制作','Make up':'补记','Make':'制作',
  'Your saved memories couldn’t be opened. Please reload before saving.':'无法打开已保存的记忆，请重新加载后再保存。',
  'This day is a saved memory now.':'这一天已成为保存的记忆。','Choose a valid date.':'请选择有效日期。','Choose up to three feelings.':'最多选择三种感受。',
  'Gently shake the jar':'轻轻摇晃罐子','Open calendar':'打开日历','Back to jar':'返回罐子','Previous month':'上个月','Next month':'下个月',
  'Previous week':'上一周','Next week':'下一周','Previous year':'上一年','Next year':'下一年',
  'Week emotion jar':'每周心情罐','Month emotion jar':'每月心情罐','Year emotion jar':'每年心情罐',
  'Emotion composition:':'情绪组成：','percent of this mix':'占混合情绪的百分比','intensity':'强度',
  'Quiet companion. Press Escape to leave, or Tab to reveal controls.':'安静陪伴。按 Esc 退出，或按 Tab 显示控制。',
  'Use whole seconds: 1–30 for breaths and 0–30 for optional holds.':'请使用整数秒：呼吸 1–30 秒，可选屏息 0–30 秒。',
  'Invalid session duration':'练习时长无效','No sounds available here yet.':'这里暂时没有可用声音。',
  'Set custom shortcut':'设置自定义快捷方式','Hold to change shortcut.':'长按修改快捷方式。','Open':'打开'
  ,'Your feelings are safely held here.':'你的感受被好好收藏在这里。','Saved':'已保存',
  'Back to methods':'返回呼吸方法','Back to Home':'返回首页','Back home':'返回首页',
  'The date cannot be changed.':'无法更改日期。','This record could not be saved. Please try again.':'无法保存这条记录，请重试。',
  'Your rhythm · seconds':'你的节奏 · 秒','Hold after inhale (optional)':'吸气后屏息（可选）','Hold after exhale (optional)':'呼气后屏息（可选）'
 }
};
let language='en';try{language=localStorage.getItem(STORAGE_KEY)==='zh-CN'?'zh-CN':'en';}catch{}
document.documentElement.lang=language;
document.title=language==='zh-CN'?'Softly — 给自己片刻':'Softly — a moment for you';
const attrNames=['aria-label','aria-description','placeholder','title'];
export function getLanguage(){return language;}
export function setLanguage(next){language=next==='zh-CN'?'zh-CN':'en';document.documentElement.lang=language;document.title=language==='zh-CN'?'Softly — 给自己片刻':'Softly — a moment for you';try{localStorage.setItem(STORAGE_KEY,language);}catch{};listeners.forEach(fn=>fn(language));}
export function toggleLanguage(){setLanguage(language==='en'?'zh-CN':'en');}
export function onLanguageChange(fn){listeners.add(fn);return()=>listeners.delete(fn);}
export function t(key,vars={}){let value=messages[language]?.[key]??messages.en[key]??key;return String(value).replace(/\{\{(\w+)\}\}/g,(_,name)=>vars[name]??'');}
export function formatDate(date,style='short'){const locale=language==='zh-CN'?'zh-CN':'en-US';const options=style==='monthYear'?{month:'long',year:'numeric'}:style==='month'?{month:'long'}:style==='weekday'?{weekday:'short'}:style==='year'?{year:'numeric'}:style==='full'?{month:'short',day:'numeric',year:'numeric'}:{month:'short',day:'numeric'};return new Intl.DateTimeFormat(locale,options).format(date);}
export function formatTime(date){return new Intl.DateTimeFormat(language==='zh-CN'?'zh-CN':'en-US',{hour:'numeric',minute:'2-digit'}).format(date);}
const translate=source=>{
 const exact=messages['zh-CN'][source];if(exact)return exact;
 let greeting=source.match(/^(Good morning|Good afternoon|Good evening)(,?)$/);if(greeting)return messages['zh-CN'][greeting[1]]+greeting[2];
 let match=source.match(/^(\d+) min$/);if(match)return `${match[1]} 分钟`;
 match=source.match(/^(\d+) (second|seconds)$/);if(match)return `${match[1]} 秒`;
 match=source.match(/^Week (\d+)$/);if(match)return `第 ${match[1]} 周`;
 match=source.match(/^(Previous|Next) (week|month|year)$/);if(match)return `${match[1]==='Previous'?'上':'下'}${{week:'一周',month:'个月',year:'一年'}[match[2]]}`;
 match=source.match(/^(Inhale|Exhale|Hold|Inhale again) (\d+)s$/);if(match)return `${messages['zh-CN'][match[1]]} ${match[2]} 秒`;
 match=source.match(/^(.+), (\d+) seconds\.$/);if(match&&messages['zh-CN'][match[1]])return `${messages['zh-CN'][match[1]]}，${match[2]} 秒。`;
 match=source.match(/^(.+) intensity$/);if(match&&messages['zh-CN'][match[1]])return `${messages['zh-CN'][match[1]]}强度`;
 match=source.match(/^Open (.+)\. Hold to change shortcut\.$/);if(match)return `打开${translate(match[1])}。长按可修改快捷方式。`;
 match=source.match(/^Set custom shortcut (\d+)$/);if(match)return `设置自定义快捷方式 ${match[1]}`;
 return source;
};
function localizeText(node){
 if(node.parentElement?.closest('.memory-note,.release-words'))return;
 const current=node.nodeValue,previous=node.__softlySource,rendered=node.__softlyRendered;
 const source=previous!==undefined&&current===rendered?previous:current;
 node.__softlySource=source;
 const trimmed=source.trim();if(!trimmed)return;
 const replacement=language==='zh-CN'?translate(trimmed):trimmed;
 const next=source.replace(trimmed,replacement);
 node.__softlyRendered=next;if(current!==next)node.nodeValue=next;
}
function localizeElement(el){for(const attr of attrNames){if(!el.hasAttribute(attr))continue;el.__softlyAttrs??={};el.__softlyRenderedAttrs??={};const current=el.getAttribute(attr),source=current===el.__softlyRenderedAttrs[attr]?el.__softlyAttrs[attr]:current;el.__softlyAttrs[attr]=source;const next=language==='zh-CN'?translate(source):source;el.__softlyRenderedAttrs[attr]=next;if(current!==next)el.setAttribute(attr,next);}}
export function applyLocale(root=document){if(root.nodeType===Node.TEXT_NODE){localizeText(root);return;}if(root.nodeType===Node.ELEMENT_NODE)localizeElement(root);const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);while(walker.nextNode()){const node=walker.currentNode;if(node.nodeType===Node.TEXT_NODE)localizeText(node);else localizeElement(node);}}
export function installLocalization(){onLanguageChange(()=>applyLocale(document));applyLocale(document);const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')applyLocale(record.target);else if(record.type==='attributes')applyLocale(record.target);else for(const node of record.addedNodes)if(node.nodeType===Node.TEXT_NODE||node.nodeType===Node.ELEMENT_NODE)applyLocale(node);}});observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrNames});}
