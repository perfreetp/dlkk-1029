import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/appStore'
import { NAME_DATABASE } from '@/data/nameDatabase'
import type { PetName } from '@/types'
import { cn } from '@/lib/utils'
import { Heart, ListChecks, Check, X, Lock, ChevronDown } from 'lucide-react'
import BatchActionBar from './BatchActionBar'

const getNameById = (id: string) => NAME_DATABASE.find((n) => n.id === id) as unknown as PetName | undefined

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="favorites"
      className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {children}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="text-7xl">❤️‍🩹</div>
        <div className="absolute -bottom-2 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-orange-100 blur-sm" />
      </div>
      <h3 className="mb-2 font-heading text-2xl text-brown-600">收藏夹空空如也</h3>
      <p className="mb-6 text-sm text-brown-400">看到喜欢的名字，点击心形按钮收藏吧~</p>
      <a
        href="#recommend"
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 px-6 py-3 font-heading text-white shadow-lg shadow-orange-200 transition-all hover:shadow-xl"
      >
        <span>去推荐区选名字吧！</span>
        <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
      </a>
    </div>
  )
}

function CharacterLockModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { favorites, lockCharacterFromFav } = useAppStore()
  const [selectedChar, setSelectedChar] = useState<string | null>(null)

  const characters = useMemo(() => {
    const chars = new Set<string>()
    favorites.forEach((f) => {
      const name = getNameById(f.nameId)
      if (name) {
        for (const ch of name.name) {
          chars.add(ch)
        }
      }
    })
    return Array.from(chars)
  }, [favorites])

  if (!open) return null

  const handleConfirm = () => {
    if (selectedChar) {
      lockCharacterFromFav(selectedChar)
      onClose()
      window.location.hash = '#filter'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg animate-fade-in-up rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-heading text-xl text-brown-700">
            <Lock className="h-5 w-5 text-orange-500" />
            从收藏夹选字锁定
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-brown-400 transition-colors hover:bg-cream-100 hover:text-brown-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-4 text-sm text-brown-500">
          点击一个字锁定，推荐结果将包含此字
        </p>
        <div className="mb-6 flex max-h-64 flex-wrap gap-2 overflow-y-auto">
          {characters.map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChar(ch)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl text-xl font-heading transition-all',
                selectedChar === ch
                  ? 'bg-gradient-to-br from-orange-400 to-pink-400 text-white shadow-lg shadow-orange-200 scale-110'
                  : 'bg-cream-100 text-brown-600 hover:bg-cream-200 hover:scale-105'
              )}
            >
              {ch}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-cream-100 px-5 py-2 text-sm font-medium text-brown-500 transition-colors hover:bg-cream-200"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedChar}
            className={cn(
              'rounded-full px-6 py-2 text-sm font-medium text-white transition-all',
              selectedChar
                ? 'bg-gradient-to-r from-orange-400 to-pink-400 shadow-lg shadow-orange-200 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-300'
            )}
          >
            确定锁定
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FavoritesSection() {
  const {
    favorites,
    compareList,
    toggleFavorite,
    toggleFavoriteSelect,
    toggleCompare,
    openDetail,
  } = useAppStore()
  const [batchMode, setBatchMode] = useState(false)
  const [lockModalOpen, setLockModalOpen] = useState(false)

  const inCompare = (nameId: string) => compareList.nameIds.includes(nameId)

  const handleCardClick = (nameId: string) => {
    if (batchMode) {
      toggleFavoriteSelect(nameId)
    } else {
      openDetail(nameId)
    }
  }

  return (
    <SectionWrapper>
      <div className="mb-6 rounded-3xl bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 shadow-lg shadow-pink-200">
              <Heart className="h-6 w-6 fill-white text-white" />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-pink-500 shadow">
                  {favorites.length}
                </span>
              )}
            </div>
            <div>
              <h2 className="font-heading text-2xl text-brown-700">我的收藏夹</h2>
              <p className="text-xs text-brown-400">珍藏每一个心动的名字</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setLockModalOpen(true)}
              disabled={favorites.length === 0}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
                favorites.length > 0
                  ? 'border border-mint-300 bg-mint-50 text-mint-600 hover:bg-mint-100'
                  : 'cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400'
              )}
            >
              <Lock className="h-4 w-4" />
              <span>选字锁定</span>
            </button>
            <button
              onClick={() => setBatchMode(!batchMode)}
              disabled={favorites.length === 0}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
                batchMode
                  ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg shadow-orange-200'
                  : favorites.length > 0
                    ? 'border border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100'
                    : 'cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400'
              )}
            >
              <ListChecks className="h-4 w-4" />
              <span>{batchMode ? '退出批量' : '批量管理'}</span>
            </button>
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav, idx) => {
            const name = getNameById(fav.nameId)
            if (!name) return null
            const isInCompare = inCompare(fav.nameId)

            return (
              <div
                key={fav.nameId}
                style={{ animationDelay: `${idx * 50}ms` }}
                className={cn(
                  'card-hover group relative cursor-pointer rounded-2xl p-4 animate-fade-in-up',
                  fav.selected && 'ring-2 ring-orange-400 ring-offset-2'
                )}
                onClick={() => handleCardClick(fav.nameId)}
              >
                {batchMode && (
                  <div
                    className={cn(
                      'absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all',
                      fav.selected
                        ? 'border-orange-400 bg-orange-400'
                        : 'border-brown-200 bg-white'
                    )}
                  >
                    {fav.selected && <Check className="h-4 w-4 text-white" />}
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(fav.nameId)
                  }}
                  className={cn(
                    'absolute right-3 top-3 z-10 rounded-full p-1.5 transition-all',
                    'bg-pink-50 text-pink-500 hover:bg-pink-100',
                    batchMode && 'opacity-50'
                  )}
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex flex-col gap-3 pt-8">
                  <div className="flex items-end justify-between">
                    <h3 className="font-heading text-3xl text-brown-700">{name.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCompare(fav.nameId)
                      }}
                      disabled={!isInCompare && compareList.nameIds.length >= 5}
                      className={cn(
                        'rounded-full p-2 transition-all',
                        isInCompare
                          ? 'bg-gradient-to-br from-sky-400 to-mint-400 text-white shadow-md'
                          : compareList.nameIds.length >= 5
                            ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                            : 'bg-cream-100 text-brown-400 hover:bg-sky-50 hover:text-sky-500'
                      )}
                      title={isInCompare ? '移出对比' : '加入对比'}
                    >
                      <span className="text-lg">⚖️</span>
                    </button>
                  </div>

                  <p className="text-xs text-brown-400 font-english">{name.pronunciation}</p>

                  <p className="line-clamp-2 text-sm text-brown-600">{name.meaning}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {name.styleTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream-100 px-2.5 py-0.5 text-xs text-brown-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {batchMode && <div className="h-24" />}
      <BatchActionBar batchMode={batchMode} onToggleBatchMode={() => setBatchMode(false)} />
      <CharacterLockModal open={lockModalOpen} onClose={() => setLockModalOpen(false)} />
    </SectionWrapper>
  )
}
