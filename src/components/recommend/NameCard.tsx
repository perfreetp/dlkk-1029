import { useState } from 'react'
import { Heart, Scale, Info, Star, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'
import type { PetName } from '@/types'

interface NameCardProps {
  nameData: PetName
  index: number
  batchMode?: boolean
  selected?: boolean
  onToggleSelect?: (id: string) => void
}

const STYLE_EMOJI_MAP: Record<string, string> = {
  古风: '🏯',
  可爱: '🎀',
  霸气: '👑',
  文艺: '📖',
  搞怪: '😂',
  简约: '⚪',
  日系: '🏮',
  欧美: '🗽',
  甜美: '🍬',
  硬核: '⚡',
  吃货: '🍔',
  招财: '🧧',
}

const HEAT_LEVEL_CONFIG: Record<
  string,
  { label: string; className: string; emoji: string }
> = {
  热门: {
    label: '热门',
    className: 'bg-red-100 text-red-600 border-red-200',
    emoji: '🔥',
  },
  常见: {
    label: '常见',
    className: 'bg-orange-100 text-orange-600 border-orange-200',
    emoji: '☀️',
  },
  小众: {
    label: '小众',
    className: 'bg-green-100 text-green-600 border-green-200',
    emoji: '🌿',
  },
  独特: {
    label: '独特',
    className: 'bg-mint-100 text-green-700 border-mint-300',
    emoji: '💎',
  },
}

function getStyleEmoji(styleTags: string[]): string {
  for (const tag of styleTags) {
    if (STYLE_EMOJI_MAP[tag]) {
      return STYLE_EMOJI_MAP[tag]
    }
  }
  return '🐾'
}

function renderStars(score: number): JSX.Element[] {
  const stars = []
  const fullStars = Math.floor(score)
  const hasHalf = score - fullStars >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
      )
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <div key={i} className="relative h-3.5 w-3.5">
          <Star className="absolute inset-0 h-3.5 w-3.5 text-orange-200" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
          </div>
        </div>
      )
    } else {
      stars.push(
        <Star key={i} className="h-3.5 w-3.5 text-orange-200" />
      )
    }
  }
  return stars
}

export default function NameCard({
  nameData,
  index,
  batchMode = false,
  selected = false,
  onToggleSelect,
}: NameCardProps) {
  const {
    id,
    name,
    pronunciation,
    styleTags,
    fluencyScore,
    heatLevel,
  } = nameData

  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const toggleCompare = useAppStore((s) => s.toggleCompare)
  const openDetail = useAppStore((s) => s.openDetail)
  const favorites = useAppStore((s) => s.favorites)
  const compareList = useAppStore((s) => s.compareList)

  const [isHeartAnimating, setIsHeartAnimating] = useState(false)

  const isFavorited = favorites.some((f) => f.nameId === id)
  const isInCompare = compareList.nameIds.includes(id)
  const decorationEmoji = getStyleEmoji(styleTags)
  const heatConfig = HEAT_LEVEL_CONFIG[heatLevel] ?? HEAT_LEVEL_CONFIG.常见

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isFavorited) {
      setIsHeartAnimating(true)
      setTimeout(() => setIsHeartAnimating(false), 500)
    }
    toggleFavorite(id)
  }

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleCompare(id)
  }

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openDetail(id)
  }

  const handleCardClick = () => {
    if (batchMode && onToggleSelect) {
      onToggleSelect(id)
    } else {
      openDetail(id)
    }
  }

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleSelect) onToggleSelect(id)
  }

  const animationDelay = `${index * 50}ms`

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'card-hover relative w-full rounded-2xl p-5',
        'animate-fade-in-up opacity-0',
        'overflow-hidden cursor-pointer',
        batchMode && selected && 'ring-2 ring-orange-400 bg-orange-50/60',
        batchMode && 'hover:ring-orange-300'
      )}
      style={{ animationDelay }}
    >
      {batchMode && (
        <button
          onClick={handleSelectClick}
          className={cn(
            'absolute left-4 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-lg border-2 transition-all duration-200',
            selected
              ? 'bg-orange-500 text-white border-orange-500 scale-105 shadow-lg shadow-orange-200'
              : 'bg-white/80 text-transparent border-orange-200 hover:border-orange-400'
          )}
        >
          {selected && <Check className="h-4 w-4" />}
        </button>
      )}

      <div className="pointer-events-none absolute -right-2 -top-2 text-5xl opacity-15 select-none">
        {decorationEmoji}
      </div>

      <div className="absolute right-4 top-4 flex items-center gap-1.5 z-10">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading border',
            heatConfig.className
          )}
        >
          <span>{heatConfig.emoji}</span>
          <span>{heatConfig.label}</span>
        </span>
      </div>

      <div className="relative z-10">
        <div className="mb-1 text-left">
          <div className="text-xs text-orange-400 font-heading mb-0.5 opacity-70">
            {decorationEmoji}
          </div>
        </div>

        <div className="text-center py-2">
          <h3 className="font-heading text-3xl md:text-4xl text-brown-800 tracking-wide text-shadow-sm">
            {name}
          </h3>
          {pronunciation && (
            <p className="mt-1 text-sm text-gray-500 font-body tracking-wider">
              「{pronunciation}」
            </p>
          )}
        </div>

        {styleTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
            {styleTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-1 text-xs rounded-full bg-cream-100 text-brown-600 border border-cream-200 font-body"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-orange-100/60">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-brown-500 font-body text-[11px]">顺口度</span>
              <div className="flex gap-0.5">{renderStars(fluencyScore)}</div>
            </div>
            <div className="text-brown-400 font-heading text-[11px]">
              {fluencyScore.toFixed(1)}
            </div>
          </div>
        </div>

        {!batchMode && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  'relative flex h-9 w-9 items-center justify-center rounded-xl',
                  'transition-all duration-200',
                  isFavorited
                    ? 'bg-pink-100 text-pink-500'
                    : 'bg-cream-100 text-brown-400 hover:bg-pink-50 hover:text-pink-400',
                  'active:scale-90'
                )}
                title={isFavorited ? '取消收藏' : '收藏'}
              >
                <Heart
                  className={cn(
                    'h-4.5 w-4.5 transition-transform',
                    isFavorited && 'fill-current',
                    isHeartAnimating && 'scale-125'
                  )}
                  style={{
                    transition: isHeartAnimating ? 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : undefined,
                  }}
                />
                {isHeartAnimating && (
                  <span className="absolute inset-0 flex items-center justify-center animate-ping">
                    <Heart className="h-4.5 w-4.5 text-pink-300 opacity-50" />
                  </span>
                )}
              </button>

              <button
                onClick={handleCompareClick}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl',
                  'transition-all duration-200',
                  isInCompare
                    ? 'bg-mint-200 text-green-700 ring-2 ring-mint-300 ring-offset-1'
                    : 'bg-cream-100 text-brown-400 hover:bg-mint-50 hover:text-green-600',
                  'active:scale-90'
                )}
                title={isInCompare ? '移除对比' : '加入对比'}
              >
                <Scale className="h-4.5 w-4.5" />
              </button>

              <button
                onClick={handleDetailClick}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl',
                  'transition-all duration-200',
                  'bg-cream-100 text-brown-400 hover:bg-orange-50 hover:text-orange-500',
                  'active:scale-90'
                )}
                title="查看详情"
              >
                <Info className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCompareClick}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-[11px] font-heading',
                  'transition-all duration-200',
                  isInCompare
                    ? 'bg-mint-100 text-green-700'
                    : 'bg-cream-100 text-brown-500 hover:bg-mint-50 hover:text-green-600',
                  'active:scale-95'
                )}
              >
                ⚖️ 对比
              </button>
              <button
                onClick={handleDetailClick}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-[11px] font-heading',
                  'bg-orange-100 text-orange-600 hover:bg-orange-200',
                  'transition-all duration-200 active:scale-95'
                )}
              >
                详情
              </button>
            </div>
          </div>
        )}

        {batchMode && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px]',
                isFavorited ? 'bg-pink-100 text-pink-600' : 'bg-cream-100 text-brown-500'
              )}>
                <Heart className={cn('h-3 w-3', isFavorited && 'fill-current')} />
                {isFavorited ? '已收藏' : '未收藏'}
              </span>
              {isInCompare && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] bg-mint-100 text-green-700">
                  <Scale className="h-3 w-3" />
                  对比中
                </span>
              )}
            </div>
            <button
              onClick={handleFavoriteClick}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[11px] font-heading',
                'transition-all duration-200 active:scale-95',
                isFavorited
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              )}
            >
              {isFavorited ? '取消收藏' : '单独收藏'}
            </button>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-br from-orange-200/20 to-transparent blur-xl" />
    </div>
  )
}
