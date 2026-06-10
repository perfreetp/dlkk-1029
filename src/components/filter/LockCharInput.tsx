import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/appStore'
import { NAME_DATABASE } from '@/data/nameDatabase'
import { cn } from '@/lib/utils'
import { Lock, X, Search } from 'lucide-react'

export default function LockCharInput() {
  const [inputValue, setInputValue] = useState('')
  const [showFavPopup, setShowFavPopup] = useState(false)
  const filterConfig = useAppStore((s) => s.filterConfig)
  const setFilterConfig = useAppStore((s) => s.setFilterConfig)
  const generateNames = useAppStore((s) => s.generateNames)
  const favorites = useAppStore((s) => s.favorites)
  const lockCharacterFromFav = useAppStore((s) => s.lockCharacterFromFav)

  const favoriteChars = useMemo(() => {
    const charSet = new Set<string>()
    favorites.forEach((fav) => {
      const name = NAME_DATABASE.find((n) => n.id === fav.nameId)
      if (name) {
        for (const ch of name.name) {
          if (/[\u4e00-\u9fa5a-zA-Z]/.test(ch)) {
            charSet.add(ch)
          }
        }
      }
    })
    return Array.from(charSet)
  }, [favorites])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const lastChar = value.slice(-1)
    if (/^[\u4e00-\u9fa5a-zA-Z]$/.test(lastChar) || value === '') {
      setInputValue(value.slice(-1))
      setFilterConfig({ lockCharacter: value.slice(-1) || undefined })
    }
  }

  const handleLock = () => {
    if (inputValue) {
      setFilterConfig({ lockCharacter: inputValue })
      generateNames()
    }
  }

  const handleClear = () => {
    setInputValue('')
    setFilterConfig({ lockCharacter: undefined })
  }

  const handleSelectFavChar = (char: string) => {
    setInputValue(char)
    lockCharacterFromFav(char)
    setShowFavPopup(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue || filterConfig.lockCharacter || ''}
            onChange={handleInputChange}
            placeholder="输入一个字..."
            maxLength={1}
            className={cn(
              'w-full h-14 pl-5 pr-12 rounded-xl text-xl font-heading',
              'bg-white border-2 border-brown-100 text-brown-700',
              'placeholder:text-brown-300 placeholder:text-base placeholder:font-body',
              'transition-all duration-300 focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100',
              'text-center tracking-widest'
            )}
          />
          {(inputValue || filterConfig.lockCharacter) && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-brown-50 hover:bg-brown-100 transition-colors"
            >
              <X className="w-4 h-4 text-brown-400" />
            </button>
          )}
        </div>
        <button
          onClick={handleLock}
          disabled={!inputValue && !filterConfig.lockCharacter}
          className={cn(
            'h-14 px-6 rounded-xl font-heading text-base flex items-center gap-2',
            'transition-all duration-300 whitespace-nowrap',
            inputValue || filterConfig.lockCharacter
              ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-300/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-brown-50 text-brown-300 cursor-not-allowed'
          )}
        >
          <Lock className="w-5 h-5" />
          <span>锁定生成</span>
        </button>
      </div>

      {favorites.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowFavPopup(!showFavPopup)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm',
              'bg-sky-50 text-sky-600 border border-sky-200',
              'hover:bg-sky-100 hover:border-sky-300 transition-all duration-300'
            )}
          >
            <Search className="w-4 h-4" />
            <span>从收藏夹选字</span>
            <span className="text-lg">🔍</span>
          </button>
        </div>
      )}

      {showFavPopup && (
        <div className={cn(
          'absolute z-20 mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-orange-100',
          'w-full max-w-sm animate-[fadeInUp_0.2s_ease-out]'
        )}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading text-brown-600">收藏夹单字</span>
            <button
              onClick={() => setShowFavPopup(false)}
              className="p-1 rounded-full hover:bg-brown-50 transition-colors"
            >
              <X className="w-4 h-4 text-brown-400" />
            </button>
          </div>
          {favoriteChars.length > 0 ? (
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
              {favoriteChars.map((char, idx) => (
                <button
                  key={`${char}-${idx}`}
                  onClick={() => handleSelectFavChar(char)}
                  className={cn(
                    'aspect-square rounded-xl font-heading text-xl',
                    'bg-gradient-to-br from-orange-50 to-cream-100 text-brown-700',
                    'border border-orange-100 transition-all duration-200',
                    'hover:from-orange-100 hover:to-orange-200 hover:scale-110',
                    'hover:shadow-md hover:border-orange-300'
                  )}
                >
                  {char}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brown-400 text-center py-4">
              收藏夹暂无可用单字
            </p>
          )}
        </div>
      )}
    </div>
  )
}
