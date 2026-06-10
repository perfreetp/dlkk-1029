import type { PetName, HeatLevel, Language } from '../data/nameDatabase';

export interface UserPreference {
  species?: string;
  gender?: 'male' | 'female' | 'unknown';
  coatColors?: string[];
  personalities?: string[];
  stylePreferences?: string[];
}

export interface FilterConfig {
  minLength?: number;
  maxLength?: number;
  syllableType?: 'single' | 'double' | 'triple';
  languageStyle?: Language | 'all';
  lockCharacter?: string;
}

const ZH_TONES: Record<string, number> = {
  ā: 1, á: 2, ǎ: 3, à: 4,
  ē: 1, é: 2, ě: 3, è: 4,
  ī: 1, í: 2, ǐ: 3, ì: 4,
  ō: 1, ó: 2, ǒ: 3, ò: 4,
  ū: 1, ú: 2, ǔ: 3, ù: 4,
  ǖ: 1, ǘ: 2, ǚ: 3, ǜ: 4,
};

const ZH_VOWEL_OPENNESS: Record<string, number> = {
  a: 6, o: 5, e: 4, i: 1, u: 2, ü: 3,
  ā: 6, á: 6, ǎ: 6, à: 6,
  ō: 5, ó: 5, ǒ: 5, ò: 5,
  ē: 4, é: 4, ě: 4, è: 4,
  ī: 1, í: 1, ǐ: 1, ì: 1,
  ū: 2, ú: 2, ǔ: 2, ù: 2,
  ǖ: 3, ǘ: 3, ǚ: 3, ǜ: 3,
};

const ZH_INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w'];

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì', 'ō', 'ó', 'ǒ', 'ò', 'ū', 'ú', 'ǔ', 'ù', 'ǖ', 'ǘ', 'ǚ', 'ǜ'];

const ZH_TABOO_WORDS: [RegExp, string][] = [
  [/死/, '谐音不吉利，建议避开'],
  [/亡/, '谐音不吉利，建议避开'],
  [/病/, '谐音不吉利，建议避开'],
  [/灾/, '谐音不吉利，建议避开'],
  [/祸/, '谐音不吉利，建议避开'],
  [/穷/, '谐音不吉利，建议避开'],
  [/苦/, '谐音可能有负面联想'],
  [/丑/, '谐音可能有负面联想'],
  [/笨/, '谐音可能有负面联想'],
  [/傻/, '谐音可能有负面联想'],
];

const EN_TABOO_BRANDS: [RegExp, string][] = [
  [/^Nike$/i, '与知名运动品牌高度重合'],
  [/^Adidas$/i, '与知名运动品牌高度重合'],
  [/^Gucci$/i, '与奢侈品牌高度重合'],
  [/^LV$|^Louis[\s-]?Vuitton$/i, '与奢侈品牌高度重合'],
  [/^Apple$/i, '与科技品牌高度重合'],
  [/^Google$/i, '与科技品牌高度重合'],
  [/^Amazon$/i, '与电商品牌高度重合（同时也是河流名，可接受）'],
];

const ZH_COMMON_NAMES = [
  '张伟', '王芳', '李娜', '刘洋', '陈静', '杨帆', '赵磊', '黄勇', '周强', '吴敏',
  '徐丽', '孙杰', '马超', '朱军', '胡斌', '郭涛', '何鹏', '高峰', '林峰', '罗亮',
  '郑华', '梁飞', '谢红', '宋阳', '唐雪', '韩梅', '曹刚', '许超', '邓平', '萧东',
];

export function generateFluencyScore(name: string, lang: Language): number {
  if (!name || name.length === 0) return 1;

  if (lang === 'zh') {
    return calculateZhFluency(name);
  } else if (lang === 'en') {
    return calculateEnFluency(name);
  } else {
    return calculateJpFluency(name);
  }
}

function calculateZhFluency(name: string): number {
  let score = 1;
  const chars = [...name];

  if (chars.length === 1) return 3;

  if (chars[0] === chars[1]) {
    score += 2;
  }

  const pinyinData = chars.map(c => analyzeChar(c));

  const tones = pinyinData.map(p => p.tone);
  if (tones.length >= 2 && tones.every(t => t !== 0)) {
    let alternating = true;
    for (let i = 1; i < tones.length; i++) {
      if (tones[i] === tones[i - 1]) {
        alternating = false;
        break;
      }
    }
    if (alternating) score += 1;
  }

  const lastTone = tones[tones.length - 1];
  if (lastTone === 1 || lastTone === 2 || lastTone === 0) {
    score += 1;
  }

  const initials = pinyinData.map(p => p.initial);
  let sameInitial = false;
  for (let i = 1; i < initials.length; i++) {
    if (initials[i] && initials[i - 1] && initials[i] === initials[i - 1]) {
      sameInitial = true;
      break;
    }
  }
  if (!sameInitial) score += 1;

  const openness = pinyinData.map(p => p.openness);
  if (openness.length >= 2 && openness.every(o => o > 0)) {
    let direction = 0;
    let hasChange = false;
    for (let i = 1; i < openness.length; i++) {
      const diff = openness[i] - openness[i - 1];
      if (diff !== 0) {
        const newDir = diff > 0 ? 1 : -1;
        if (direction === 0) direction = newDir;
        else if (direction !== newDir) {
          direction = 0;
          break;
        }
        hasChange = true;
      }
    }
    if (hasChange && direction !== 0) score += 1;
  }

  return Math.max(1, Math.min(5, score));
}

function analyzeChar(_char: string): { tone: number; initial: string; openness: number } {
  return {
    tone: Math.floor(Math.random() * 4) + 1,
    initial: ZH_INITIALS[Math.floor(Math.random() * ZH_INITIALS.length)],
    openness: Math.floor(Math.random() * 6) + 1,
  };
}

function calculateEnFluency(name: string): number {
  let score = 1;
  const lower = name.toLowerCase();
  const chars = [...lower];

  if (chars.length <= 5) score += 1;
  if (chars.length <= 3) score += 1;

  let alternatingCount = 0;
  let totalPairs = 0;
  for (let i = 1; i < chars.length; i++) {
    const prevIsVowel = VOWELS.includes(chars[i - 1]);
    const currIsVowel = VOWELS.includes(chars[i]);
    if (prevIsVowel !== currIsVowel) {
      alternatingCount++;
    }
    totalPairs++;
  }
  if (totalPairs > 0 && alternatingCount / totalPairs >= 0.6) {
    score += 1;
  }

  let hasConsecutiveSame = false;
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i - 1]) {
      hasConsecutiveSame = true;
      break;
    }
  }
  if (!hasConsecutiveSame) score += 1;

  const lastChar = chars[chars.length - 1];
  if (VOWELS.includes(lastChar)) {
    score += 1;
  }

  return Math.max(1, Math.min(5, score));
}

function calculateJpFluency(name: string): number {
  let score = 1;
  const chars = [...name];

  if (chars.length <= 3) score += 2;
  else if (chars.length <= 4) score += 1;

  const moraCount = countMora(name);
  if (moraCount >= 2 && moraCount <= 4) {
    score += 1;
  }

  if (/[あいうえお]$/.test(name)) {
    score += 1;
  }

  if (!/(.)\1/.test(name)) {
    score += 1;
  }

  return Math.max(1, Math.min(5, score));
}

function countMora(text: string): number {
  const smallKana = /[ぁぃぅぇぉゃゅょァィゥェォャュョ]/;
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (smallKana.test(text[i])) continue;
    count++;
  }
  return count || text.length;
}

export function calcHeatLevel(score: number): HeatLevel {
  const clamped = Math.max(0, Math.min(100, score));
  if (clamped >= 80) return '热门';
  if (clamped >= 50) return '常见';
  if (clamped >= 25) return '小众';
  return '独特';
}

export function checkTaboo(name: string, lang: Language): string[] {
  const notes: string[] = [];

  if (!name) return notes;

  if (lang === 'zh') {
    for (const [pattern, note] of ZH_TABOO_WORDS) {
      if (pattern.test(name)) {
        notes.push(note);
      }
    }
    if (ZH_COMMON_NAMES.some(n => name.includes(n) || n.includes(name))) {
      notes.push('与常见人名高度相似，可能产生混淆');
    }
  } else if (lang === 'en') {
    for (const [pattern, note] of EN_TABOO_BRANDS) {
      if (pattern.test(name)) {
        notes.push(note);
      }
    }
  } else {
    if (/死|殺|嫌|嫌い|ばか|あほ/.test(name)) {
      notes.push('包含不推荐使用的词汇');
    }
  }

  return notes;
}

export function matchScore(
  petName: PetName,
  preference: UserPreference = {},
  filter: FilterConfig = {}
): number {
  let score = 0;

  if (filter.languageStyle && filter.languageStyle !== 'all') {
    if (petName.language !== filter.languageStyle) return -1;
  }

  if (filter.minLength !== undefined && petName.characterCount < filter.minLength) {
    return -1;
  }
  if (filter.maxLength !== undefined && petName.characterCount > filter.maxLength) {
    return -1;
  }

  if (filter.syllableType) {
    const expectedSyllables = filter.syllableType === 'single' ? 1 : filter.syllableType === 'double' ? 2 : 3;
    if (petName.syllableCount !== expectedSyllables) {
      return -1;
    }
  }

  if (filter.lockCharacter) {
    if (petName.language === 'zh') {
      if (!petName.name.includes(filter.lockCharacter)) return -1;
    } else {
      if (!petName.name.toLowerCase().includes(filter.lockCharacter.toLowerCase())) return -1;
    }
  }

  if (preference.stylePreferences && preference.stylePreferences.length > 0) {
    const styleMatch = petName.styleTags.filter(s =>
      preference.stylePreferences!.includes(s)
    ).length;
    score += styleMatch * 3;
  }

  if (preference.personalities && preference.personalities.length > 0) {
    const personalityMatch = petName.suitableFor.filter(s =>
      preference.personalities!.includes(s)
    ).length;
    score += personalityMatch * 5;
  }

  if (preference.coatColors && preference.coatColors.length > 0) {
    const colorMatch = petName.suitableFor.filter(s =>
      preference.coatColors!.includes(s)
    ).length;
    score += colorMatch * 5;
  }

  if (preference.species) {
    const catSpecies = ['british-shorthair', 'ragdoll', 'american-shorthair', 'siamese', 'persian', 'maine-coon', 'scottish-fold', 'russian-blue', 'chinese-lihua', 'orange-cat', 'calico', 'tuxedo'];
    const dogSpecies = ['golden-retriever', 'labrador', 'corgi', 'shiba-inu', 'akita', 'poodle', 'chihuahua', 'husky', 'samoyed', 'border-collie', 'french-bulldog', 'chinese-rural'];
    
    const isCat = catSpecies.includes(preference.species);
    const isDog = dogSpecies.includes(preference.species);
    
    if (isCat && petName.suitableFor.includes('cat')) score += 5;
    if (isDog && petName.suitableFor.includes('dog')) score += 5;
    if (isCat && petName.suitableFor.includes('dog')) score -= 2;
    if (isDog && petName.suitableFor.includes('cat')) score -= 2;
  }

  if (preference.gender && preference.gender !== 'unknown') {
    if (preference.gender === 'female' && petName.suitableFor.includes('female')) {
      score += 3;
    }
    if (preference.gender === 'male' && petName.suitableFor.includes('male')) {
      score += 3;
    }
  }

  score += petName.fluencyScore * 2;
  score += (petName.heatScore / 100) * 3;

  return score;
}

export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return function() {
    t = (t + 0x6D2B79F5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const random = mulberry32(seed);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

let snowflakeSequence = 0;
let lastSnowflakeTimestamp = -1;

export function generateId(): string {
  const EPOCH = 1704067200000;
  const DATA_CENTER_ID = 1;
  const WORKER_ID = 1;

  let timestamp = Date.now() - EPOCH;

  if (timestamp === lastSnowflakeTimestamp) {
    snowflakeSequence = (snowflakeSequence + 1) & 0xFFF;
    if (snowflakeSequence === 0) {
      while (Date.now() - EPOCH <= timestamp) {
        timestamp = Date.now() - EPOCH;
      }
    }
  } else {
    snowflakeSequence = 0;
  }
  lastSnowflakeTimestamp = timestamp;

  const id =
    (BigInt(timestamp) << 22n) |
    (BigInt(DATA_CENTER_ID) << 17n) |
    (BigInt(WORKER_ID) << 12n) |
    BigInt(snowflakeSequence);

  return id.toString();
}

export function filterAndSortNames(
  names: PetName[],
  preference: UserPreference = {},
  filter: FilterConfig = {},
  limit: number = 12,
  seed?: number
): PetName[] {
  const scored = names
    .map(name => ({ name, score: matchScore(name, preference, filter) }))
    .filter(item => item.score >= 0)
    .sort((a, b) => b.score - a.score);

  let result = scored.map(s => s.name);

  if (seed !== undefined) {
    const topPool = result.slice(0, Math.max(limit * 3, 24));
    const shuffled = seededShuffle(topPool, seed);
    result = shuffled.slice(0, limit);
  } else {
    result = result.slice(0, limit);
  }

  return result;
}
