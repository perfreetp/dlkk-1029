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

interface AppState {
  userPreference: UserPreference
  filterConfig: FilterConfig
  recommendedNames: PetName[]
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
  removeFavorites: (ids: string[]) => void
  clearFavorites: () => void
  toggleFavoriteSelect: (nameId: string) => void
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

function adaptPrefForUtils(pref: UserPreference) {
  const breed = (pref.catBreed || pref.dogBreed) as string | undefined
  return {
    species: breed ?? pref.species,
    gender: pref.gender,
    coatColors: pref.coatColors as string[],
    personalities: pref.personalities as string[],
    stylePreferences: pref.stylePreferences as string[],
  }
}

function adaptFilterForUtils(f: FilterConfig, currentCategory: NameType) {
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
    _category: currentCategory,
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userPreference: defaultUserPreference,
      filterConfig: defaultFilterConfig,
      recommendedNames: [],
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

        const prefU = adaptPrefForUtils(userPreference)
        const filtU = adaptFilterForUtils(filterConfig, currentCategory)
        void filtU._category

        // 1) 按风格匹配基础打分排序
        // 2) 按 seed 随机打乱取前 16
        const resultAll = filterAndSortNames(
          categoryFiltered as unknown as Parameters<typeof filterAndSortNames>[0],
          prefU,
          {
            minLength: filtU.minLength,
            maxLength: filtU.maxLength,
            syllableType: filtU.syllableType,
            lockCharacter: filtU.lockCharacter,
          },
          16,
          randomSeed
        )

        set({ recommendedNames: resultAll as unknown as PetName[] })
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
            }
          }
          return {
            favorites: [
              ...state.favorites,
              { nameId, addedAt: Date.now(), selected: false },
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
        const { recommendedNames } = get()
        if (recommendedNames.length === 0) return
        const randomIdx = Math.floor(Math.random() * recommendedNames.length)
        const picked = recommendedNames[randomIdx]
        set({
          compareList: {
            nameIds: [picked.id],
            pickedResult: picked.id,
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
    }
  )
)
