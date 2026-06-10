import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  UserPreference,
  FilterConfig,
  PetName,
  NameType,
  FavoriteItem,
  CompareList,
  PosterConfig,
  PetSpeciesType,
  Gender,
  LanguageStyle,
} from '../types'
import { NAME_DATABASE } from '../data/nameDatabase'
import { filterAndSortNames } from '../utils/naming'
import type { CatBreed, DogBreed } from '../types'

interface AppState {
  userPreference: UserPreference
  filterConfig: FilterConfig
  recommendedNames: PetName[]
  selectedRecommendIds: string[]
  recommendBatchMode: boolean
  currentCategory: NameType
  favorites: FavoriteItem[]
  compareList: CompareList
  selectedNameId: string | null
  detailOpen: boolean
  posterConfig: PosterConfig
  randomSeed: number

  setUserPreference: (patch: Partial<UserPreference>) => void
  setFilterConfig: (patch: Partial<FilterConfig>) => void
  setCurrentCategory: (cat: NameType) => void
  generateNames: () => void
  refreshNames: () => void
  toggleFavorite: (nameId: string) => void
  addFavorites: (ids: string[]) => void
  removeFavorites: (ids: string[]) => void
  clearFavorites: () => void
  toggleFavoriteSelect: (nameId: string) => void
  setRecommendBatchMode: (v: boolean) => void
  toggleRecommendSelect: (nameId: string) => void
  toggleRecommendSelectAll: () => void
  clearRecommendSelection: () => void
  batchAddSelectedToFavorites: () => number
  toggleCompare: (nameId: string) => void
  clearCompare: () => void
  pickRandom: () => void
  openDetail: (nameId: string) => void
  closeDetail: () => void
  setPosterConfig: (patch: Partial<PosterConfig>) => void
  lockCharacterFromFav: (char: string) => void
}

const defaultUserPreference: UserPreference = {
  species: 'cat' as PetSpeciesType,
  gender: 'unknown' as Gender,
  coatColors: [],
  personalities: [],
  stylePreferences: [],
}

const defaultFilterConfig: FilterConfig = {
  minLength: 1,
  maxLength: 4,
  languageStyle: ['zh'] as LanguageStyle[],
}

const defaultPosterConfig: PosterConfig = {
  templateId: 'warm',
  nameId: '',
  petEmoji: '🐱',
}

// =============== 细分品种 → 适合标签映射 ===============
// 这样即使 nameDatabase 里的 suitableFor 只有大类标签，也能通过品种映射影响推荐
const BREED_TAGS: Record<string, { suitableTags: string[]; styleBoost: string[] }> = {
  // === 猫咪 ===
  ragdoll: {
    suitableTags: ['white', 'fluffy', 'quiet', 'clingy', 'gentle', 'blue', 'cream', 'beautiful', 'cat'],
    styleBoost: ['cute', 'literary', 'ancient'],
  },
  'orange-cat': {
    suitableTags: ['orange', 'yellow', 'greedy', 'chubby', 'lazy', 'lively', 'cat'],
    styleBoost: ['foodie', 'cute', 'funny', 'fortune'],
  },
  'british-shorthair': {
    suitableTags: ['gray', 'blue', 'chubby', 'quiet', 'aloof', 'cat', 'round'],
    styleBoost: ['minimalist', 'literary', 'cool'],
  },
  'american-shorthair': {
    suitableTags: ['silver', 'tabby', 'smart', 'lively', 'cat', 'strong'],
    styleBoost: ['western', 'cool', 'smart'],
  },
  siamese: {
    suitableTags: ['brown', 'cream', 'blue', 'smart', 'aloof', 'vocal', 'cat', 'elegant'],
    styleBoost: ['literary', 'ancient', 'japanese'],
  },
  persian: {
    suitableTags: ['white', 'fluffy', 'quiet', 'beautiful', 'cat', 'lazy', 'clingy'],
    styleBoost: ['ancient', 'literary', 'elegant', 'cute'],
  },
  'maine-coon': {
    suitableTags: ['fluffy', 'large', 'brown', 'tabby', 'brave', 'cat', 'strong', 'smart'],
    styleBoost: ['cool', 'ancient', 'fortune'],
  },
  'scottish-fold': {
    suitableTags: ['round', 'chubby', 'quiet', 'clingy', 'cat', 'cute', 'gray'],
    styleBoost: ['cute', 'minimalist'],
  },
  'russian-blue': {
    suitableTags: ['blue', 'gray', 'silver', 'aloof', 'smart', 'cat', 'elegant', 'quiet'],
    styleBoost: ['cool', 'literary', 'minimalist'],
  },
  'chinese-lihua': {
    suitableTags: ['tabby', 'strong', 'smart', 'brave', 'cat', 'loyal', 'lively'],
    styleBoost: ['ancient', 'cool', 'fortune'],
  },
  calico: {
    suitableTags: ['tricolor', 'white', 'orange', 'black', 'cat', 'beautiful', 'cute'],
    styleBoost: ['cute', 'fortune', 'ancient'],
  },
  tuxedo: {
    suitableTags: ['black', 'white', 'tuxedo', 'cat', 'smart', 'formal', 'elegant'],
    styleBoost: ['literary', 'cool', 'formal'],
  },

  // === 狗狗 ===
  'golden-retriever': {
    suitableTags: ['yellow', 'golden', 'fluffy', 'loyal', 'gentle', 'smart', 'dog', 'friendly', 'lively'],
    styleBoost: ['fortune', 'cute', 'literary'],
  },
  labrador: {
    suitableTags: ['black', 'yellow', 'brown', 'loyal', 'smart', 'dog', 'friendly', 'greedy'],
    styleBoost: ['cool', 'cute', 'foodie'],
  },
  corgi: {
    suitableTags: ['yellow', 'orange', 'brown', 'white', 'short', 'chubby', 'dog', 'cute', 'lively', 'loyal'],
    styleBoost: ['cute', 'funny', 'foodie', 'fortune'],
  },
  'shiba-inu': {
    suitableTags: ['brown', 'orange', 'red', 'dog', 'aloof', 'smart', 'brave', 'small'],
    styleBoost: ['japanese', 'cool', 'cute', 'ancient'],
  },
  akita: {
    suitableTags: ['brown', 'white', 'red', 'dog', 'brave', 'loyal', 'large', 'strong'],
    styleBoost: ['japanese', 'ancient', 'cool', 'fortune'],
  },
  poodle: {
    suitableTags: ['fluffy', 'white', 'brown', 'gray', 'dog', 'smart', 'beautiful', 'elegant'],
    styleBoost: ['literary', 'cute', 'elegant'],
  },
  chihuahua: {
    suitableTags: ['small', 'brown', 'white', 'dog', 'brave', 'lively', 'vocal'],
    styleBoost: ['cute', 'cool', 'funny'],
  },
  husky: {
    suitableTags: ['gray', 'white', 'black', 'blue', 'dog', 'lively', 'naughty', 'vocal', 'strong'],
    styleBoost: ['cool', 'funny', 'western', 'literary'],
  },
  samoyed: {
    suitableTags: ['white', 'fluffy', 'dog', 'smiling', 'friendly', 'lively', 'gentle'],
    styleBoost: ['cute', 'literary', 'fortune'],
  },
  'border-collie': {
    suitableTags: ['black', 'white', 'brown', 'dog', 'smart', 'lively', 'brave', 'strong'],
    styleBoost: ['smart', 'cool', 'literary'],
  },
  'french-bulldog': {
    suitableTags: ['brown', 'white', 'black', 'dog', 'small', 'chubby', 'lazy', 'cute'],
    styleBoost: ['cute', 'cool', 'funny'],
  },
  'chinese-rural': {
    suitableTags: ['dog', 'yellow', 'brown', 'black', 'loyal', 'brave', 'strong', 'smart'],
    styleBoost: ['ancient', 'fortune', 'cool'],
  },
}

type DBName = (typeof NAME_DATABASE)[number]

function adaptNamesForStore(
  dbNames: DBName[],
  currentCategory: NameType,
  filter: FilterConfig
): PetName[] {
  const langSet = new Set(filter.languageStyle)
  return dbNames
    .filter((n) => n.type === currentCategory)
    .filter((n) => langSet.size === 0 || langSet.has(n.language as LanguageStyle))
    .filter(
      (n) =>
        n.characterCount >= (filter.minLength ?? 1) &&
        n.characterCount <= (filter.maxLength ?? 99)
    )
    .filter((n) =>
      filter.lockCharacter && filter.lockCharacter.length > 0
        ? n.name.includes(filter.lockCharacter)
        : true
    )
    .map((n) => n as unknown as PetName)
}

function adaptPrefForUtilsWithBreed(pref: UserPreference): {
  coatColors: string[]
  personalities: string[]
  stylePreferences: string[]
} {
  const breed = (pref.catBreed || pref.dogBreed) as CatBreed | DogBreed | undefined

  const breedTags = breed && BREED_TAGS[breed] ? BREED_TAGS[breed] : null

  const baseColors = [...(pref.coatColors as string[])]
  const basePersonalities = [...(pref.personalities as string[])]
  const baseStyles = [...(pref.stylePreferences as string[])]

  if (breedTags) {
    // 品种适合标签中提取颜色和性格，增加到匹配池
    breedTags.suitableTags.forEach((tag) => {
      if (COLOR_TAG_LIST.includes(tag) && !baseColors.includes(tag)) {
        baseColors.push(tag)
      }
      if (PERSONALITY_TAG_LIST.includes(tag) && !basePersonalities.includes(tag)) {
        basePersonalities.push(tag)
      }
    })
    // 品种风格偏好加权
    breedTags.styleBoost.forEach((s) => {
      if (!baseStyles.includes(s)) baseStyles.push(s)
    })
  }

  return {
    coatColors: baseColors,
    personalities: basePersonalities,
    stylePreferences: baseStyles,
  }
}

const COLOR_TAG_LIST = [
  'white',
  'black',
  'yellow',
  'orange',
  'gray',
  'brown',
  'cream',
  'blue',
  'silver',
  'red',
  'golden',
  'tricolor',
  'tabby',
  'tuxedo',
  'fluffy',
]

const PERSONALITY_TAG_LIST = [
  'quiet',
  'clingy',
  'aloof',
  'lively',
  'smart',
  'brave',
  'naughty',
  'greedy',
  'lazy',
  'loyal',
  'strong',
  'gentle',
  'friendly',
  'chubby',
  'small',
  'large',
  'beautiful',
  'elegant',
  'cute',
  'vocal',
  'calm',
]

function adaptFilterForUtils(
  f: FilterConfig,
  _currentCategory: NameType
): {
  minLength?: number
  maxLength?: number
  syllableType?: 'single' | 'double' | 'triple'
  languageStyle: 'zh' | 'en' | 'jp' | 'all'
  lockCharacter?: string
} {
  const prefForCurrent =
    f.languageStyle && f.languageStyle.length > 0
      ? (f.languageStyle[0] as 'zh' | 'en' | 'jp')
      : 'all'
  return {
    minLength: f.minLength,
    maxLength: f.maxLength,
    syllableType: f.syllableType,
    languageStyle: prefForCurrent as 'zh' | 'en' | 'jp' | 'all',
    lockCharacter: f.lockCharacter,
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userPreference: defaultUserPreference,
      filterConfig: defaultFilterConfig,
      recommendedNames: [],
      selectedRecommendIds: [],
      recommendBatchMode: false,
      currentCategory: 'nickname',
      favorites: [],
      compareList: { nameIds: [] },
      selectedNameId: null,
      detailOpen: false,
      posterConfig: defaultPosterConfig,
      randomSeed: 0,

      setUserPreference: (patch) =>
        set((state) => ({
          userPreference: { ...state.userPreference, ...patch },
        })),

      setFilterConfig: (patch) =>
        set((state) => ({
          filterConfig: { ...state.filterConfig, ...patch },
        })),

      setCurrentCategory: (cat) => set({ currentCategory: cat }),

      generateNames: () => {
        const { userPreference, filterConfig, currentCategory, randomSeed } = get()

        const categoryFiltered = adaptNamesForStore(
          NAME_DATABASE,
          currentCategory,
          filterConfig
        )

        const boostedPref = adaptPrefForUtilsWithBreed(userPreference)
        const filtU = adaptFilterForUtils(filterConfig, currentCategory)

        const resultAll = filterAndSortNames(
          categoryFiltered as unknown as Parameters<typeof filterAndSortNames>[0],
          boostedPref,
          filtU,
          16,
          randomSeed
        )

        set({
          recommendedNames: resultAll as unknown as PetName[],
          selectedRecommendIds: [],
        })
      },

      refreshNames: () => {
        const { randomSeed } = get()
        set({ randomSeed: randomSeed + 1 })
        setTimeout(() => get().generateNames(), 0)
      },

      toggleFavorite: (nameId) =>
        set((state) => {
          const exists = state.favorites.find((f) => f.nameId === nameId)
          if (exists) {
            return {
              favorites: state.favorites.filter((f) => f.nameId !== nameId),
              compareList: {
                ...state.compareList,
                nameIds: state.compareList.nameIds,
              },
            }
          }
          return {
            favorites: [
              ...state.favorites,
              { nameId, addedAt: Date.now(), selected: false },
            ],
          }
        }),

      addFavorites: (ids) =>
        set((state) => {
          const existing = new Set(state.favorites.map((f) => f.nameId))
          const toAdd = ids.filter((id) => !existing.has(id))
          if (toAdd.length === 0) return state
          return {
            favorites: [
              ...state.favorites,
              ...toAdd.map((id) => ({ nameId: id, addedAt: Date.now(), selected: false })),
            ],
          }
        }),

      removeFavorites: (ids) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => !ids.includes(f.nameId)),
        })),

      clearFavorites: () => set({ favorites: [] }),

      toggleFavoriteSelect: (nameId) =>
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.nameId === nameId ? { ...f, selected: !f.selected } : f
          ),
        })),

      setRecommendBatchMode: (v) =>
        set({ recommendBatchMode: v, selectedRecommendIds: v ? [] : get().selectedRecommendIds }),

      toggleRecommendSelect: (nameId) =>
        set((state) => {
          const exists = state.selectedRecommendIds.includes(nameId)
          return {
            selectedRecommendIds: exists
              ? state.selectedRecommendIds.filter((id) => id !== nameId)
              : [...state.selectedRecommendIds, nameId],
          }
        }),

      toggleRecommendSelectAll: () =>
        set((state) => {
          const all = state.recommendedNames.map((n) => n.id)
          const isAllSelected =
            all.length > 0 && all.every((id) => state.selectedRecommendIds.includes(id))
          return {
            selectedRecommendIds: isAllSelected ? [] : all,
          }
        }),

      clearRecommendSelection: () => set({ selectedRecommendIds: [], recommendBatchMode: false }),

      batchAddSelectedToFavorites: () => {
        const ids = get().selectedRecommendIds
        if (ids.length === 0) return 0
        get().addFavorites(ids)
        set({ selectedRecommendIds: [] })
        return ids.length
      },

      toggleCompare: (nameId) =>
        set((state) => {
          const { nameIds } = state.compareList
          const idx = nameIds.indexOf(nameId)
          if (idx > -1) {
            return {
              compareList: {
                ...state.compareList,
                nameIds: nameIds.filter((id) => id !== nameId),
              },
            }
          }
          if (nameIds.length >= 5) {
            return state
          }
          return {
            compareList: {
              ...state.compareList,
              nameIds: [...nameIds, nameId],
            },
          }
        }),

      clearCompare: () =>
        set((state) => ({
          compareList: { ...state.compareList, nameIds: [], pickedResult: undefined },
        })),

      pickRandom: () => {
        const { compareList, recommendedNames, favorites } = get()
        // 优先从对比清单选；如果对比清单空，从收藏夹选；否则从推荐选
        let pool: string[] = compareList.nameIds
        if (pool.length === 0) pool = favorites.map((f) => f.nameId)
        if (pool.length === 0) pool = recommendedNames.map((n) => n.id)
        if (pool.length === 0) return
        const randomIdx = Math.floor(Math.random() * pool.length)
        const picked = pool[randomIdx]
        set({
          compareList: {
            nameIds: pool.length <= 5 ? pool : compareList.nameIds,
            pickedResult: picked,
          },
        })
      },

      openDetail: (nameId) => set({ selectedNameId: nameId, detailOpen: true }),

      closeDetail: () => set({ detailOpen: false, selectedNameId: null }),

      setPosterConfig: (patch) =>
        set((state) => ({
          posterConfig: { ...state.posterConfig, ...patch },
        })),

      lockCharacterFromFav: (char) =>
        set((state) => ({
          filterConfig: { ...state.filterConfig, lockCharacter: char },
        })),
    }),
    {
      name: 'pet-naming-app-v1',
      // 持久化白名单：收藏、对比、海报配置、用户偏好、筛选配置
      partialize: (state) => ({
        favorites: state.favorites,
        compareList: state.compareList,
        posterConfig: state.posterConfig,
        userPreference: state.userPreference,
        filterConfig: state.filterConfig,
        currentCategory: state.currentCategory,
      }),
    }
  )
)

export function getNameById(id: string): PetName | undefined {
  return NAME_DATABASE.find((n) => n.id === id) as unknown as PetName | undefined
}
