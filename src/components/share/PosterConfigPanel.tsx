import { useState, useRef, useEffect } from 'react'
import { Smile, Tag, ChevronDown, Star, GitCompare, Sparkles } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { PET_NAMES } from '../../data/nameDatabase'
import { PET_EMOJIS } from '../../data/posterTemplates'

type DatabasePetName = typeof PET_NAMES[number]

export default function PosterConfigPanel() {
  const posterConfig = useAppStore((state) => state.posterConfig)
  const setPosterConfig = useAppStore((state) => state.setPosterConfig)
  const favorites = useAppStore((state) => state.favorites)
  const compareList = useAppStore((state) => state.compareList)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const favoriteNames = favorites
    .map((f) => PET_NAMES.find((n) => n.id === f.nameId))
    .filter((n): n is DatabasePetName => n !== undefined)

  const compareNames = compareList.nameIds
    .map((id) => PET_NAMES.find((n) => n.id === id))
    .filter((n): n is DatabasePetName => n !== undefined)

  const selectedName = PET_NAMES.find((n) => n.id === posterConfig.nameId)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full space-y-6">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <Smile className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-800">选择宠物表情</h3>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {PET_EMOJIS.map((emoji) => {
            const isSelected = posterConfig.petEmoji === emoji
            return (
              <button
                key={emoji}
                onClick={() => setPosterConfig({ petEmoji: emoji })}
                className={`
                  aspect-square flex items-center justify-center text-2xl sm:text-3xl rounded-xl
                  transition-all duration-200 transform active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-300
                  ${isSelected
                    ? 'bg-orange-100 ring-2 ring-orange-400 scale-105 shadow-md'
                    : 'bg-gray-50 hover:bg-orange-50 hover:scale-102 border border-gray-100'
                  }
                `}
              >
                {emoji}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full" ref={dropdownRef}>
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-800">选择海报名字</h3>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-xl border-2
              transition-all duration-200 text-left
              focus:outline-none focus:ring-4 focus:ring-orange-100
              ${isDropdownOpen
                ? 'border-orange-400 bg-orange-50/50'
                : selectedName
                ? 'border-gray-200 bg-white hover:border-orange-300'
                : 'border-dashed border-orange-300 bg-orange-50/30 hover:bg-orange-50/50'
              }
            `}
          >
            {selectedName ? (
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-xl">
                  ✨
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-800 truncate">{selectedName.name}</p>
                  <p className="text-xs text-gray-500 truncate">{selectedName.pronunciation} · {selectedName.meaning}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-500">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">从收藏夹/对比清单选名字</span>
              </div>
            )}
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in-up max-h-80 overflow-y-auto">
              {favoriteNames.length === 0 && compareNames.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-orange-300" />
                  </div>
                  <p className="text-gray-600 font-medium mb-1">还没有可选的名字</p>
                  <p className="text-sm text-gray-400">先去起名页收藏几个喜欢的名字吧~</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {compareNames.length > 0 && (
                    <div className="p-2">
                      <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 uppercase tracking-wide">
                        <GitCompare className="w-3.5 h-3.5" />
                        对比清单
                        <span className="ml-auto bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full text-xs">
                          {compareNames.length}
                        </span>
                      </div>
                      {compareNames.map((name) => (
                        <button
                          key={name.id}
                          onClick={() => {
                            setPosterConfig({ nameId: name.id })
                            setIsDropdownOpen(false)
                          }}
                          className={`
                            w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-center gap-3
                            ${posterConfig.nameId === name.id
                              ? 'bg-blue-50 ring-2 ring-blue-200'
                              : 'hover:bg-gray-50'
                            }
                          `}
                        >
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-lg flex-shrink-0">
                            🐾
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-800 truncate">{name.name}</p>
                            <p className="text-xs text-gray-500 truncate">{name.pronunciation}</p>
                          </div>
                          {posterConfig.nameId === name.id && (
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {favoriteNames.length > 0 && (
                    <div className="p-2">
                      <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-600 uppercase tracking-wide">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        我的收藏
                        <span className="ml-auto bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full text-xs">
                          {favoriteNames.length}
                        </span>
                      </div>
                      {favoriteNames.map((name) => (
                        <button
                          key={name.id}
                          onClick={() => {
                            setPosterConfig({ nameId: name.id })
                            setIsDropdownOpen(false)
                          }}
                          className={`
                            w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-center gap-3
                            ${posterConfig.nameId === name.id
                              ? 'bg-amber-50 ring-2 ring-amber-200'
                              : 'hover:bg-gray-50'
                            }
                          `}
                        >
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-lg flex-shrink-0">
                            ⭐
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-800 truncate">{name.name}</p>
                            <p className="text-xs text-gray-500 truncate">{name.pronunciation}</p>
                          </div>
                          {posterConfig.nameId === name.id && (
                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {selectedName && (
          <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                {posterConfig.petEmoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-800">{selectedName.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
                    {selectedName.type === 'nickname' ? '昵称' : selectedName.type === 'formal' ? '正式' : '叠字'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {selectedName.language === 'zh' ? '中文' : selectedName.language === 'en' ? '英文' : '日文'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">读音：{selectedName.pronunciation}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  <span className="text-orange-500 font-medium">寓意：</span>
                  {selectedName.meaning}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
