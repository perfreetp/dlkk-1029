import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { NAME_CATEGORIES } from '@/data/presetOptions'
import { useAppStore } from '@/store/appStore'
import { cn } from '@/lib/utils'
import type { NameType } from '@/types'

export default function CategoryTabs() {
  const currentCategory = useAppStore((s) => s.currentCategory)
  const setCurrentCategory = useAppStore((s) => s.setCurrentCategory)
  const generateNames = useAppStore((s) => s.generateNames)
  const refreshNames = useAppStore((s) => s.refreshNames)
  const recommendedNames = useAppStore((s) => s.recommendedNames)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleCategoryChange = (cat: NameType) => {
    if (cat === currentCategory) return
    setCurrentCategory(cat)
    generateNames()
  }

  const handleRefresh = () => {
    if (isRefreshing || recommendedNames.length === 0) return
    setIsRefreshing(true)
    refreshNames()
    setTimeout(() => setIsRefreshing(false), 600)
  }

  const currentCategoryData = NAME_CATEGORIES.find(
    (c) => c.value === currentCategory
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className={cn(
            'flex p-1.5 rounded-full',
            'bg-cream-200/60 border border-orange-200/40',
            'shadow-inner shadow-orange-100/50'
          )}
        >
          {NAME_CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={cn(
                  'relative px-5 md:px-7 py-2.5 rounded-full',
                  'font-heading text-base md:text-lg transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-orange-300/50',
                  isActive
                    ? 'text-white shadow-lg shadow-orange-300/40 cursor-default'
                    : 'text-brown-600 hover:text-brown-800 hover:bg-cream-50/50'
                )}
              >
                {isActive && (
                  <div
                    className={cn(
                      'absolute inset-0 rounded-full',
                      'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400',
                      'bg-[length:200%_100%] animate-pulse'
                    )}
                    style={{ animationDuration: '3s' }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing || recommendedNames.length === 0}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-full',
            'font-heading text-sm transition-all duration-300',
            'border border-orange-200/60',
            recommendedNames.length === 0
              ? 'bg-cream-100 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-white/70 text-brown-700 hover:bg-orange-50 hover:border-orange-300 hover:shadow-md hover:shadow-orange-100 active:scale-95'
          )}
        >
          <RefreshCw
            className={cn(
              'h-4 w-4',
              isRefreshing && 'animate-spin'
            )}
          />
          <span>换一批</span>
        </button>
      </div>

      {currentCategoryData && (
        <p className="text-xs md:text-sm text-brown-500 pl-2 flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-orange-400" />
          {currentCategoryData.desc}
        </p>
      )}
    </div>
  )
}
