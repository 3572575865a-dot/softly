export const emotions=[['Happy','#FFE7A8'],['Calm','#CFECC7'],['Loved','#F8B4C3'],['Energized','#FFD0AE'],['Excited','#FCD681'],['Hopeful','#E4CDFB'],['Sad','#BFD7EE'],['Anxious','#A7BDD6'],['Stressed','#C9A7C7'],['Angry','#B9CFEA'],['Numb','#C7B7D3'],['Drained','#D2C8C8']].map(([emotionType,color])=>({emotionType,color}));
// Historical identities remain themselves and are never offered as new selections.
export const legacyEmotions=[{emotionType:'Content',color:'#EA9B90'},{emotionType:'Dreamy',color:'#DBC0E8'}];
export const allEmotions=[...emotions,...legacyEmotions];
export const emotionColor=type=>allEmotions.find(e=>e.emotionType===type)?.color||'#ffffff';
