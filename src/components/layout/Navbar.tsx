import { useState, useEffect } from 'react'
import { PawPrint } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { cn } from '@/lib/utils'

interface TabItem {
  id: string
  label: string
  icon: string
  badgeCount?: number
}

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>('quiz')
  const favorites = useAppStore((state) => state.favorites)
  const compareList = useAppStore((state) => state.compareList)

  const tabs: TabItem[] = [
    { id: 'quiz', label: '偏好问答', icon: '🧠' },
    { id: 'recommend', label: '名字推荐', icon: '✨' },
    { id: 'filter', label: '风格筛选', icon: '🎨' },
    { id: 'favorites', label: '收藏夹', icon: '❤️', badgeCount: favorites.length },
    { id: 'compare', label: '对比清单', icon: '⚖️', badgeCount: compareList.nameIds.length },
    { id: 'share', label: '分享海报', icon: '🖼️' },
  ]

  useEffect(() => {
    const sectionIds = tabs.map((t) => t.id)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream-50/90 border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-brown-600 hidden sm:inline whitespace-nowrap">
              宠物起名工坊
            </span>
          </button>

          <div className="flex-1 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max md:justify-end py-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleScrollTo(tab.id)}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
                    'flex items-center gap-1.5',
                    activeId === tab.id
                      ? 'bg-orange-400 text-white shadow-md shadow-orange-400/30'
                      : 'bg-white text-brown-600 hover:bg-cream-100 border border-cream-200'
                  )}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                    <span
                      className={cn(
                        'absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full px-1.5 flex items-center justify-center text-xs font-bold',
                        activeId === tab.id ? 'bg-white text-orange-500' : 'bg-orange-400 text-white'
                      )}
                    >
                      {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
