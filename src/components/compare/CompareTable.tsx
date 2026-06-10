import { useMemo } from 'react'
import { useAppStore } from '@/store/appStore'
import { NAME_DATABASE } from '@/data/nameDatabase'
import type { PetName } from '@/types'
import { cn } from '@/lib/utils'
import { X, Scale } from 'lucide-react'
import RandomPicker from './RandomPicker'

const getNameById = (id: string) => NAME_DATABASE.find((n) => n.id === id) as unknown as PetName | undefined

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="compare"
      className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {children}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="text-7xl">⚖️</div>
        <div className="absolute -bottom-2 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-sky-100 blur-sm" />
      </div>
      <h3 className="mb-2 font-heading text-2xl text-brown-600">还没有添加对比</h3>
      <p className="mb-6 text-sm text-brown-400">
        从推荐卡片或收藏夹点击 ⚖️ 按钮，最多可添加5个名字对比
      </p>
      <a
        href="#recommend"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-mint-400 px-6 py-3 font-heading text-white shadow-lg shadow-sky-200 transition-all hover:shadow-xl"
      >
        <Scale className="h-5 w-5" />
        <span>去添加对比名字</span>
      </a>
    </div>
  )
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex justify-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn('text-lg', i < score ? 'text-orange-400' : 'text-cream-200')}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

function HeatBar({ score }: { score: number }) {
  const color = useMemo(() => {
    if (score >= 80) return 'bg-gradient-to-r from-red-400 to-orange-400'
    if (score >= 50) return 'bg-gradient-to-r from-orange-400 to-yellow-400'
    if (score >= 25) return 'bg-gradient-to-r from-yellow-400 to-green-400'
    return 'bg-gradient-to-r from-green-400 to-sky-400'
  }, [score])

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-cream-100">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-medium text-brown-500">{score}</span>
    </div>
  )
}

function StyleMatchBar({ name, userPref }: { name: PetName; userPref: string[] }) {
  const intersection = useMemo(
    () => name.styleTags.filter((t) => userPref.includes(t as never)).length,
    [name.styleTags, userPref]
  )
  const total = Math.max(userPref.length, 1)
  const percent = Math.round((intersection / total) * 100)

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-cream-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint-400 to-sky-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-medium text-brown-500">{percent}%</span>
    </div>
  )
}

export default function CompareTable() {
  const { compareList, userPreference, toggleCompare, clearCompare, openDetail } = useAppStore()
  const { nameIds } = compareList
  const names = useMemo(() => nameIds.map(getNameById).filter(Boolean) as PetName[], [nameIds])

  return (
    <SectionWrapper>
      <div className="mb-6 rounded-3xl bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-mint-400 shadow-lg shadow-sky-200">
              <Scale className="h-6 w-6 text-white" />
              {names.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-sky-500 shadow">
                  {names.length}/5
                </span>
              )}
            </div>
            <div>
              <h2 className="font-heading text-2xl text-brown-700">对比清单</h2>
              <p className="text-xs text-brown-400">横向对比，选出最适合的名字</p>
            </div>
          </div>
        </div>
      </div>

      {names.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="overflow-x-auto rounded-3xl bg-white/70 shadow-sm backdrop-blur-sm">
            <table className="w-full min-w-[600px] border-collapse">
              <thead className="sticky top-0 z-10 bg-cream-100">
                <tr>
                  <th className="w-28 rounded-tl-3xl px-4 py-4 text-left font-medium text-brown-500">
                    维度
                  </th>
                  {names.map((name, idx) => (
                    <th
                      key={name.id}
                      className={cn(
                        'relative min-w-[140px] px-4 py-4',
                        idx === names.length - 1 && 'rounded-tr-3xl'
                      )}
                    >
                      <button
                        onClick={() => toggleCompare(name.id)}
                        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-brown-400 shadow-sm transition-all hover:bg-pink-50 hover:text-pink-500"
                        title="移除对比"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDetail(name.id)}
                        className="block w-full pt-2 text-center transition-transform hover:scale-105"
                      >
                        <span className="font-heading text-2xl text-brown-700">{name.name}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                <tr className="hover:bg-cream-50/50">
                  <td className="px-4 py-4 text-sm font-medium text-brown-500">读音</td>
                  {names.map((name) => (
                    <td key={name.id} className="px-4 py-4 text-center font-english text-sm text-brown-600">
                      {name.pronunciation}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-cream-50/50">
                  <td className="px-4 py-4 text-sm font-medium text-brown-500">含义</td>
                  {names.map((name) => (
                    <td key={name.id} className="px-4 py-4 text-center text-sm text-brown-600">
                      {name.meaning}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-cream-50/50">
                  <td className="px-4 py-4 text-sm font-medium text-brown-500">顺口度 ⭐</td>
                  {names.map((name) => (
                    <td key={name.id} className="px-4 py-4">
                      <Stars score={name.fluencyScore} />
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-cream-50/50">
                  <td className="px-4 py-4 text-sm font-medium text-brown-500">热度 🔥</td>
                  {names.map((name) => (
                    <td key={name.id} className="px-4 py-4">
                      <HeatBar score={name.heatScore} />
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-cream-50/50">
                  <td className="px-4 py-4 text-sm font-medium text-brown-500">风格匹配 💡</td>
                  {names.map((name) => (
                    <td key={name.id} className="px-4 py-4">
                      <StyleMatchBar name={name} userPref={userPreference.stylePreferences} />
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-cream-50/50">
                  <td className="rounded-bl-3xl px-4 py-4 text-sm font-medium text-brown-500">
                    避讳 ⚠️
                  </td>
                  {names.map((name, idx) => (
                    <td
                      key={name.id}
                      className={cn(
                        'px-4 py-4 text-center text-xs',
                        idx === names.length - 1 && 'rounded-br-3xl'
                      )}
                    >
                      {name.tabooNotes && name.tabooNotes.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-1">
                          {name.tabooNotes.map((note, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-pink-50 px-2 py-0.5 text-pink-500"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-mint-500">✓ 无避讳</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={clearCompare}
              className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-6 py-3 text-sm font-medium text-brown-500 transition-all hover:bg-cream-100"
            >
              <X className="h-4 w-4" />
              <span>清空对比</span>
            </button>
            <RandomPicker />
          </div>
        </>
      )}
    </SectionWrapper>
  )
}
