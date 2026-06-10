export type NameType = 'nickname' | 'formal' | 'reduplicative';
export type PosterTemplate = 'warm' | 'cool' | 'classic' | 'cute' | 'japanese';

export interface BreedOption {
  value: string;
  label: string;
  emoji: string;
}

export interface CoatColorOption {
  value: string;
  label: string;
  colorHEX: string;
}

export interface PersonalityOption {
  value: string;
  label: string;
  icon: string;
}

export interface StylePreferenceOption {
  value: string;
  label: string;
  desc: string;
}

export interface NameCategoryOption {
  value: NameType;
  label: string;
  desc: string;
}

export interface LanguageStyleOption {
  value: 'zh' | 'en' | 'jp';
  label: string;
  flag: string;
}

export interface SyllableTypeOption {
  value: 'single' | 'double' | 'triple';
  label: string;
}

export interface PosterTemplateOption {
  value: PosterTemplate;
  label: string;
  previewColors: [string, string, string];
}

export const CAT_BREEDS: BreedOption[] = [
  { value: 'british-shorthair', label: '英国短毛猫', emoji: '🐱' },
  { value: 'ragdoll', label: '布偶猫', emoji: '😺' },
  { value: 'american-shorthair', label: '美国短毛猫', emoji: '😸' },
  { value: 'siamese', label: '暹罗猫', emoji: '😼' },
  { value: 'persian', label: '波斯猫', emoji: '😽' },
  { value: 'maine-coon', label: '缅因猫', emoji: '🙀' },
  { value: 'scottish-fold', label: '苏格兰折耳猫', emoji: '😿' },
  { value: 'russian-blue', label: '俄罗斯蓝猫', emoji: '😾' },
  { value: 'chinese-lihua', label: '中华田园猫', emoji: '🐈' },
  { value: 'orange-cat', label: '橘猫', emoji: '🍊' },
  { value: 'calico', label: '三花猫', emoji: '🌸' },
  { value: 'tuxedo', label: '奶牛猫', emoji: '🐄' },
];

export const DOG_BREEDS: BreedOption[] = [
  { value: 'golden-retriever', label: '金毛寻回犬', emoji: '🐕' },
  { value: 'labrador', label: '拉布拉多', emoji: '🦮' },
  { value: 'corgi', label: '柯基', emoji: '🐶' },
  { value: 'shiba-inu', label: '柴犬', emoji: '🐕‍🦺' },
  { value: 'akita', label: '秋田犬', emoji: '🐩' },
  { value: 'poodle', label: '贵宾犬', emoji: '🐩' },
  { value: 'chihuahua', label: '吉娃娃', emoji: '🐕' },
  { value: 'husky', label: '哈士奇', emoji: '🐺' },
  { value: 'samoyed', label: '萨摩耶', emoji: '☁️' },
  { value: 'border-collie', label: '边境牧羊犬', emoji: '🐑' },
  { value: 'french-bulldog', label: '法国斗牛犬', emoji: '🐶' },
  { value: 'chinese-rural', label: '中华田园犬', emoji: '🦴' },
];

export const COAT_COLORS: CoatColorOption[] = [
  { value: 'white', label: '白色', colorHEX: '#FFFFFF' },
  { value: 'black', label: '黑色', colorHEX: '#2D2D2D' },
  { value: 'yellow', label: '黄色', colorHEX: '#F5D76E' },
  { value: 'orange', label: '橘色', colorHEX: '#F5A962' },
  { value: 'gray', label: '灰色', colorHEX: '#A0A0A0' },
  { value: 'brown', label: '棕色', colorHEX: '#8B6F47' },
  { value: 'cream', label: '奶咖', colorHEX: '#E8D4B8' },
  { value: 'tricolor', label: '三花', colorHEX: '#E8A0BF' },
  { value: 'tuxedo', label: '奶牛', colorHEX: '#4A4A4A' },
  { value: 'blue', label: '蓝灰', colorHEX: '#B5D8EB' },
  { value: 'red', label: '红棕', colorHEX: '#C85A5A' },
  { value: 'silver', label: '银色', colorHEX: '#C0C0C0' },
];

export const PERSONALITIES: PersonalityOption[] = [
  { value: 'lively', label: '活泼好动', icon: '⚡' },
  { value: 'quiet', label: '安静温顺', icon: '🌸' },
  { value: 'clingy', label: '粘人撒娇', icon: '💕' },
  { value: 'aloof', label: '高冷独立', icon: '❄️' },
  { value: 'greedy', label: '贪吃嘴馋', icon: '🍖' },
  { value: 'naughty', label: '调皮捣蛋', icon: '🎭' },
  { value: 'brave', label: '勇敢胆大', icon: '🦁' },
  { value: 'timid', label: '胆小怕生', icon: '🐰' },
  { value: 'smart', label: '聪明机灵', icon: '🧠' },
  { value: 'lazy', label: '慵懒嗜睡', icon: '😴' },
  { value: 'loyal', label: '忠诚护主', icon: '🛡️' },
  { value: 'curious', label: '好奇心强', icon: '🔍' },
];

export const STYLE_PREFERENCES: StylePreferenceOption[] = [
  { value: 'ancient', label: '古风雅致', desc: '诗经楚辞、诗词典故' },
  { value: 'cute', label: '可爱软萌', desc: '叠词、食物、小动物' },
  { value: 'cool', label: '霸气酷炫', desc: '帝王、神兽、自然力量' },
  { value: 'literary', label: '文艺清新', desc: '自然景物、诗意意象' },
  { value: 'funny', label: '搞怪有趣', desc: '反差萌、网络热梗' },
  { value: 'minimalist', label: '简约大气', desc: '单字、两字简洁' },
  { value: 'japanese', label: '日系和风', desc: '假名、日式意象' },
  { value: 'western', label: '欧美经典', desc: '英文、西方典故' },
  { value: 'foodie', label: '吃货专属', desc: '美食、甜品、饮料' },
  { value: 'fortune', label: '吉祥招财', desc: '财富、好运、福气' },
];

export const NAME_CATEGORIES: NameCategoryOption[] = [
  { value: 'nickname', label: '昵称', desc: '亲切可爱、日常好叫的小名' },
  { value: 'formal', label: '正式名', desc: '有寓意、有文化内涵的大名' },
  { value: 'reduplicative', label: '叠字名', desc: '重复音节、软萌顺口' },
];

export const LANGUAGE_STYLES: LanguageStyleOption[] = [
  { value: 'zh', label: '中文', flag: '🇨🇳' },
  { value: 'en', label: '英文', flag: '🇺🇸' },
  { value: 'jp', label: '日文', flag: '🇯🇵' },
];

export const SYLLABLE_TYPES: SyllableTypeOption[] = [
  { value: 'single', label: '单音节' },
  { value: 'double', label: '双音节' },
  { value: 'triple', label: '三音节' },
];

export const POSTER_TEMPLATES: PosterTemplateOption[] = [
  {
    value: 'warm',
    label: '温馨治愈',
    previewColors: ['#FFF9F2', '#8B6F47', '#F5A962'],
  },
  {
    value: 'cool',
    label: '酷炫个性',
    previewColors: ['#1A1A2E', '#E8E8E8', '#6C5CE7'],
  },
  {
    value: 'classic',
    label: '古风典雅',
    previewColors: ['#F5F0E1', '#8B4513', '#C41E3A'],
  },
  {
    value: 'cute',
    label: '软萌可爱',
    previewColors: ['#FFE4EC', '#FF6B9D', '#FFB6C1'],
  },
  {
    value: 'japanese',
    label: '日系清新',
    previewColors: ['#F0F8FF', '#2E8B57', '#FFB7C5'],
  },
];
