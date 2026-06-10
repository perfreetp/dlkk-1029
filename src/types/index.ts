export type PetSpeciesType = 'cat' | 'dog'

export type CatBreed =
  | 'british-shorthair'
  | 'american-shorthair'
  | 'ragdoll'
  | 'orange-cat'
  | 'chinese-lihua'
  | 'siamese'
  | 'persian'
  | 'maine-coon'
  | 'other'

export type DogBreed =
  | 'golden-retriever'
  | 'labrador'
  | 'corgi'
  | 'teddy'
  | 'shiba-inu'
  | 'border-collie'
  | 'husky'
  | 'samoyed'
  | 'pomeranian'
  | 'other'

export type Gender = 'male' | 'female' | 'unknown'

export type CoatColor =
  | 'white'
  | 'black'
  | 'yellow'
  | 'orange'
  | 'gray'
  | 'brown'
  | 'calico'
  | 'tabby'

export type Personality =
  | '活泼'
  | '安静'
  | '粘人'
  | '高冷'
  | '贪吃'
  | '调皮'
  | '勇敢'
  | '胆小'
  | '聪明'
  | '懒'

export type StylePref =
  | '古风'
  | '可爱'
  | '霸气'
  | '文艺'
  | '搞怪'
  | '简约'
  | '日系'
  | '欧美'
  | '甜美'
  | '硬核'

export type NameType = 'nickname' | 'formal' | 'reduplicative'

export type LanguageStyle = 'zh' | 'en' | 'jp'

export type SyllableType = 'single' | 'double' | 'triple'

export interface UserPreference {
  species: PetSpeciesType
  catBreed?: CatBreed
  dogBreed?: DogBreed
  gender: Gender
  coatColors: CoatColor[]
  personalities: Personality[]
  stylePreferences: StylePref[]
}

export interface FilterConfig {
  minLength: number
  maxLength: number
  syllableType?: SyllableType
  languageStyle: LanguageStyle[]
  lockCharacter?: string
}

export interface PetName {
  id: string
  name: string
  type: NameType
  language: LanguageStyle
  pronunciation: string
  meaning: string
  origin: string
  syllableCount: number
  characterCount: number
  fluencyScore: number
  heatScore: number
  heatLevel: '热门' | '常见' | '小众' | '独特'
  styleTags: string[]
  suitableFor: string[]
  tabooNotes: string[]
}

export interface FavoriteItem {
  nameId: string
  addedAt: number
  selected: boolean
}

export interface CompareList {
  nameIds: string[]
  pickedResult?: string
}

export type PosterTemplate = 'warm' | 'cool' | 'classic' | 'cute'

export interface PosterConfig {
  templateId: PosterTemplate
  nameId: string
  petEmoji: string
  backgroundColor?: string
}
