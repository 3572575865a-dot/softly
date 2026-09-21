export const emotions=[['Happy','#FFF391'],['Calm','#CCEDA4'],['Loved','#EB7C93'],['Energized','#FCA177'],['Excited','#FFD864'],['Hopeful','#DDBEF0'],['Sad','#9CB4C2'],['Anxious','#6785A2'],['Stressed','#A36490'],['Angry','#39507F'],['Numb','#7E6781'],['Drained','#847A81']].map(([emotionType,color])=>({emotionType,color}));
// Historical identities remain themselves and are never offered as new selections.
export const legacyEmotions=[{emotionType:'Content',color:'#EA9B90'},{emotionType:'Dreamy',color:'#DBC0E8'}];
export const allEmotions=[...emotions,...legacyEmotions];
export const emotionColor=type=>allEmotions.find(e=>e.emotionType===type)?.color||'#ffffff';
