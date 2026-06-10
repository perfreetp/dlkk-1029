import { useEffect, useMemo } from 'react'
import { useAppStore } from '@/store/appStore'
import { NAME_DATABASE } from '@/data/nameDatabase'
import { STYLE_PREFERENCES } from '@/data/presetOptions'
import { cn } from '@/lib/utils'
import {
  X,
  Star,
  Flame,
  AlertTriangle,
  Heart,
  Scale,
  Dices,
} from 'lucide-react'
import type { PetName } from '@/types'

const STYLE_TAG_MAP: Record<string, { label: string; color: string }> = {}
STYLE_PREFERENCES.forEach((s) => {
  STYLE_TAG_MAP[s.value] = { label: s.label, color: s.value }
})

const getTagColor = (tag: string) => {
  const colorMap: Record<string, string> = {
    ancient: 'bg-amber-100 text-amber-700 border-amber-200',
    cute: 'bg-pink-100 text-pink-700 border-pink-200',
    cool: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    literary: 'bg-sky-100 text-sky-700 border-sky-200',
    funny: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    minimalist: 'bg-stone-100 text-stone-700 border-stone-200',
    japanese: 'bg-rose-100 text-rose-700 border-rose-200',
    western: 'bg-violet-100 text-violet-700 border-violet-200',
    foodie: 'bg-orange-100 text-orange-700 border-orange-200',
    fortune: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  }
  return colorMap[tag] || 'bg-brown-100 text-brown-700 border-brown-200'
}

const HEAT_LEVEL_COLOR: Record<string, string> = {
  热门: 'bg-red-100 text-red-600',
  常见: 'bg-orange-100 text-orange-600',
  小众: 'bg-mint-100 text-mint-600',
  独特: 'bg-sky-100 text-sky-600',
}

export default function NameDetailDrawer() {
  const detailOpen = useAppStore((s) => s.detailOpen)
  const selectedNameId = useAppStore((s) => s.selectedNameId)
  const closeDetail = useAppStore((s) => s.closeDetail)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const toggleCompare = useAppStore((s) => s.toggleCompare)
  const pickRandom = useAppStore((s) => s.pickRandom)
  const favorites = useAppStore((s) => s.favorites)
  const compareList = useAppStore((s) => s.compareList)

  const nameData: PetName | undefined = useMemo(() => {
    if (!selectedNameId) return undefined
    return NAME_DATABASE.find((n) => n.id === selectedNameId) as unknown as PetName | undefined
  }, [selectedNameId])

  const isFavorited = selectedNameId ? favorites.some((f) => f.nameId === selectedNameId) : false
  const isCompared = selectedNameId ? compareList.nameIds.includes(selectedNameId) : false

  useEffect(() => {
    if (detailOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [detailOpen])

  const handleClose = () => {
    closeDetail()
  }

  const handleFavorite = () => {
    if (selectedNameId) toggleFavorite(selectedNameId)
  }

  const handleCompare = () => {
    if (selectedNameId) toggleCompare(selectedNameId)
  }

  const handlePickRandom = () => {
    if (selectedNameId) {
      toggleCompare(selectedNameId)
    }
    pickRandom()
  }

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(score)
      const half = !filled && i < score
      return (
        <Star
          key={i}
          className={cn(
            'w-5 h-5 transition-all duration-300',
            filled || half
              ? 'text-orange-400 fill-orange-400 drop-shadow-sm'
              : 'text-brown-200'
          )}
        />
      )
    })
  }

  const getFluencyDesc = (score: number) => {
    if (score >= 5) return '朗朗上口，余音绕梁'
    if (score >= 4) return '顺口好叫，悦耳动听'
    if (score >= 3) return '发音通顺，日常可用'
    if (score >= 2) return '稍有拗口，需练习'
    return '发音较难，慎选'
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-500',
          'bg-black/40 backdrop-blur-sm',
          detailOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full shadow-2xl',
          'w-full md:w-[480px] bg-cream-50',
          'transition-transform duration-500 ease-out',
          'flex flex-col',
          detailOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-brown-100 bg-white/50 backdrop-blur-sm">
          <h3 className="font-heading text-lg text-brown-600">名字详情</h3>
          <button
            onClick={handleClose}
            className={cn(
              'p-2 rounded-full transition-all duration-300',
              'hover:bg-brown-100 active:scale-95'
            )}
          >
            <X className="w-6 h-6 text-brown-500" />
          </button>
        </div>

        {nameData ? (
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/30 via-pink-200/30 to-mint-200/30 rounded-3xl blur-2xl" />
                <h1 className="relative font-heading text-6xl text-brown-800 tracking-wider text-shadow-strong py-4">
                  {nameData.name}
                </h1>
              </div>
              <p className="text-brown-400 italic text-sm font-body">
                {nameData.pronunciation}
              </p>
            </div>

            <section className="space-y-2 bg-white/70 rounded-2xl p-5 border border-brown-50">
              <h4 className="font-heading text-base text-brown-500 flex items-center gap-2">
                <span>📜</span>
                <span>来源典故</span>
              </h4>
              <p className="text-brown-600 leading-relaxed text-sm">
                {nameData.origin}
              </p>
            </section>

            <section className="space-y-3 relative bg-gradient-to-br from-orange-50/80 to-pink-50/60 rounded-2xl p-5 border border-orange-100/50 overflow-hidden">
              <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none pointer-events-none">
                {nameData.language === 'zh' ? '💫' : nameData.language === 'en' ? '✨' : '🌸'}
              </div>
              <h4 className="font-heading text-base text-brown-500 flex items-center gap-2 relative">
                <span>💡</span>
                <span>美好寓意</span>
              </h4>
              <p className="text-brown-700 leading-relaxed text-base font-medium relative">
                {nameData.meaning}
              </p>
            </section>

            <section className="space-y-3 bg-white/70 rounded-2xl p-5 border border-brown-50">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base text-brown-500 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>顺口度</span>
                </h4>
                <div className="flex gap-0.5">{renderStars(nameData.fluencyScore)}</div>
              </div>
              <div className="h-3 bg-brown-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(nameData.fluencyScore / 5) * 100}%` }}
                />
              </div>
              <p className="text-sm text-brown-400 text-center">
                {getFluencyDesc(nameData.fluencyScore)}
              </p>
            </section>

            <section className="space-y-3 bg-white/70 rounded-2xl p-5 border border-brown-50">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base text-brown-500 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>热度指数</span>
                </h4>
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-heading',
                    HEAT_LEVEL_COLOR[nameData.heatLevel] || 'bg-brown-100 text-brown-600'
                  )}
                >
                  {nameData.heatLevel}
                </span>
              </div>
              <div className="h-3 bg-brown-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700 ease-out',
                    nameData.heatScore >= 80
                      ? 'bg-gradient-to-r from-red-400 to-red-500'
                      : nameData.heatScore >= 50
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                      : nameData.heatScore >= 25
                      ? 'bg-gradient-to-r from-mint-400 to-mint-500'
                      : 'bg-gradient-to-r from-sky-400 to-sky-500'
                  )}
                  style={{ width: `${nameData.heatScore}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-brown-400">
                <span>独特</span>
                <span className="font-heading text-base text-brown-600">{nameData.heatScore}/100</span>
                <span>热门</span>
              </div>
            </section>

            {nameData.styleTags && nameData.styleTags.length > 0 && (
              <section className="space-y-3">
                <h4 className="font-heading text-base text-brown-500 flex items-center gap-2">
                  <span>🏷️</span>
                  <span>风格标签</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nameData.styleTags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        'px-4 py-1.5 rounded-full text-sm font-heading border',
                        'transition-all duration-300 hover:scale-105',
                        getTagColor(tag)
                      )}
                    >
                      #{STYLE_TAG_MAP[tag]?.label || tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {nameData.tabooNotes && nameData.tabooNotes.length > 0 && (
              <section className="space-y-3 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <h4 className="font-heading text-base text-yellow-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>避讳提示</span>
                </h4>
                <ul className="space-y-2">
                  {nameData.tabooNotes.map((note, idx) => (
                    <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">⚠️</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-brown-300 font-heading">暂无详情</p>
          </div>
        )}

        {nameData && (
          <div className="px-6 py-4 border-t border-brown-100 bg-white/70 backdrop-blur-sm space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleFavorite}
                className={cn(
                  'py-3 rounded-xl font-heading text-sm flex flex-col items-center gap-1',
                  'transition-all duration-300 border-2',
                  isFavorited
                    ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white border-pink-400 shadow-lg shadow-pink-300/40 scale-[1.02]'
                    : 'bg-white text-brown-600 border-brown-100 hover:border-pink-200 hover:bg-pink-50'
                )}
              >
                <Heart
                  className={cn('w-5 h-5', isFavorited && 'fill-current')}
                />
                <span>{isFavorited ? '已收藏' : '收藏'}</span>
              </button>

              <button
                onClick={handleCompare}
                className={cn(
                  'py-3 rounded-xl font-heading text-sm flex flex-col items-center gap-1',
                  'transition-all duration-300 border-2',
                  isCompared
                    ? 'bg-gradient-to-br from-mint-400 to-mint-500 text-brown-800 border-mint-400 shadow-lg shadow-mint-300/40 scale-[1.02]'
                    : 'bg-white text-brown-600 border-brown-100 hover:border-mint-200 hover:bg-mint-50'
                )}
              >
                <Scale className="w-5 h-5" />
                <span>{isCompared ? '已对比' : '对比'}</span>
              </button>

              <button
                onClick={handlePickRandom}
                className={cn(
                  'py-3 rounded-xl font-heading text-sm flex flex-col items-center gap-1',
                  'transition-all duration-300 border-2',
                  'bg-white text-brown-600 border-brown-100 hover:border-orange-200 hover:bg-orange-50',
                  'active:scale-95'
                )}
              >
                <Dices className="w-5 h-5 text-orange-500" />
                <span className="text-orange-600">试试手气</span>
              </button>
            </div>

            <button
              onClick={handleClose}
              className={cn(
                'w-full py-4 rounded-xl font-heading text-white text-base',
                'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400',
                'bg-[length:200%_auto] shadow-lg shadow-orange-300/40',
                'transition-all duration-500 hover:bg-[position:right_center] hover:shadow-xl hover:scale-[1.01]',
                'active:scale-[0.98]'
              )}
            >
              ✨ 我要这个名字
            </button>
          </div>
        )}
      </div>
    </>
  )
}
