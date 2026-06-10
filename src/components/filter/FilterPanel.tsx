import { useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { LANGUAGE_STYLES, SYLLABLE_TYPES } from '@/data/presetOptions'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp, X, RotateCcw } from 'lucide-react'
import LockCharInput from './LockCharInput'
import type { LanguageStyle, SyllableType } from '@/types'

const LENGTH_OPTIONS = [1, 2, 3, 4]

export default function FilterPanel() {
  const [expanded, setExpanded] = useState(true)
  const filterConfig = useAppStore((s) => s.filterConfig)
  const setFilterConfig = useAppStore((s) => s.setFilterConfig)
  const generateNames = useAppStore((s) => s.generateNames)

  const toggleLanguage = (value: LanguageStyle) => {
    const current = filterConfig.languageStyle
    let next: LanguageStyle[]
    if (current.includes(value)) {
      next = current.filter((v) => v !== value)
      if (next.length === 0) next = ['zh']
    } else {
      next = [...current, value]
    }
    setFilterConfig({ languageStyle: next })
  }

  const toggleLength = (len: number) => {
    let { minLength, maxLength } = filterConfig
    if (len < minLength) {
      minLength = len
    } else if (len > maxLength) {
      maxLength = len
    } else {
      if (minLength === maxLength) return
      if (len === minLength) minLength = len + 1
      else if (len === maxLength) maxLength = len - 1
      else maxLength = len
    }
    setFilterConfig({ minLength, maxLength })
  }

  const setSyllable = (value: SyllableType | undefined) => {
    setFilterConfig({ syllableType: value })
  }

  const handleReset = () => {
    setFilterConfig({
      minLength: 1,
      maxLength: 4,
      languageStyle: ['zh'],
      syllableType: undefined,
      lockCharacter: undefined,
    })
  }

  const handleApply = () => {
    generateNames()
  }

  const isLengthActive = (len: number) =>
    len >= filterConfig.minLength && len <= filterConfig.maxLength

  return (
    <div className={cn(
      'w-full bg-cream-50 rounded-2xl shadow-lg border border-orange-100/50',
      'backdrop-blur-sm overflow-hidden'
    )}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'w-full flex items-center justify-between px-6 py-4',
          'bg-gradient-to-r from-orange-50 to-cream-100',
          'border-b border-orange-100/50 transition-colors',
          'hover:from-orange-100 hover:to-cream-200'
        )}
      >
        <h3 className="font-heading text-xl text-brown-700 flex items-center gap-2">
          <span>🎛️</span>
          <span>多维筛选</span>
        </h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-brown-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brown-500" />
        )}
      </button>

      {expanded && (
        <div className="p-6 space-y-6">
          <section className="space-y-3">
            <h4 className="font-heading text-lg text-brown-600 flex items-center gap-2">
              <span>🌍</span>
              <span>语言风格</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {LANGUAGE_STYLES.map((lang) => {
                const active = filterConfig.languageStyle.includes(lang.value)
                return (
                  <button
                    key={lang.value}
                    onClick={() => toggleLanguage(lang.value)}
                    className={cn(
                      'py-3 px-4 rounded-xl font-heading text-sm transition-all duration-300',
                      'border-2 flex flex-col items-center gap-1',
                      active
                        ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white border-orange-400 shadow-md scale-[1.02]'
                        : 'bg-white text-brown-600 border-brown-100 hover:border-orange-200 hover:bg-orange-50'
                    )}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-heading text-lg text-brown-600 flex items-center gap-2">
              <span>📏</span>
              <span>字数范围</span>
              <span className="text-sm font-body text-brown-400 ml-2">
                （{filterConfig.minLength} ~ {filterConfig.maxLength}字）
              </span>
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {LENGTH_OPTIONS.map((len) => {
                const active = isLengthActive(len)
                return (
                  <button
                    key={len}
                    onClick={() => toggleLength(len)}
                    className={cn(
                      'py-3 rounded-xl font-heading text-base transition-all duration-300 border-2',
                      active
                        ? 'bg-gradient-to-br from-mint-300 to-mint-400 text-brown-700 border-mint-400 shadow-md'
                        : 'bg-white text-brown-400 border-brown-100 hover:border-mint-200 hover:bg-mint-50'
                    )}
                  >
                    {len}字
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-heading text-lg text-brown-600 flex items-center gap-2">
              <span>🎵</span>
              <span>音节数</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {SYLLABLE_TYPES.map((syl) => {
                const active = filterConfig.syllableType === syl.value
                return (
                  <button
                    key={syl.value}
                    onClick={() => setSyllable(active ? undefined : syl.value)}
                    className={cn(
                      'px-6 py-2 rounded-full font-heading text-sm transition-all duration-300 border-2',
                      active
                        ? 'bg-gradient-to-r from-pink-300 to-pink-400 text-white border-pink-400 shadow-md scale-105'
                        : 'bg-white text-brown-600 border-brown-100 hover:border-pink-200 hover:bg-pink-50'
                    )}
                  >
                    {syl.label}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-heading text-lg text-brown-600 flex items-center gap-2">
              <span>🔒</span>
              <span>锁定字</span>
            </h4>
            <LockCharInput />
            {filterConfig.lockCharacter && (
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-sm text-brown-500">
                  所有生成名字必须包含
                  <span className="mx-1 font-heading text-orange-500 text-lg">
                    「{filterConfig.lockCharacter}」
                  </span>
                </span>
                <button
                  onClick={() => setFilterConfig({ lockCharacter: undefined })}
                  className="ml-auto p-1 rounded-full hover:bg-orange-100 transition-colors"
                >
                  <X className="w-4 h-4 text-brown-400" />
                </button>
              </div>
            )}
          </section>

          <div className="flex items-center gap-3 pt-4 border-t border-brown-100">
            <button
              onClick={handleReset}
              className={cn(
                'flex-1 py-3 rounded-xl font-heading text-brown-500',
                'bg-white border-2 border-brown-100 transition-all duration-300',
                'hover:border-brown-200 hover:bg-brown-50 flex items-center justify-center gap-2'
              )}
            >
              <RotateCcw className="w-4 h-4" />
              <span>清空筛选</span>
            </button>
            <button
              onClick={handleApply}
              className={cn(
                'flex-[2] py-4 rounded-xl font-heading text-white text-lg',
                'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400',
                'bg-[length:200%_auto] shadow-lg shadow-orange-300/40',
                'transition-all duration-500 hover:bg-[position:right_center] hover:shadow-xl hover:scale-[1.02]',
                'active:scale-[0.98]'
              )}
            >
              ✨ 应用筛选
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
