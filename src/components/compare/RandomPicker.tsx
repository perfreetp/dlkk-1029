import { useState, useEffect, useRef, useMemo } from 'react'
import { useAppStore } from '@/store/appStore'
import { NAME_DATABASE } from '@/data/nameDatabase'
import type { PetName } from '@/types'
import { cn } from '@/lib/utils'
import { Dice1, Image, RefreshCw } from 'lucide-react'

const getNameById = (id: string) => NAME_DATABASE.find((n) => n.id === id) as unknown as PetName | undefined

const CONFETTI_COLORS = [
  '#F5A962',
  '#FFB6C1',
  '#A8D8B9',
  '#B5D8EB',
  '#8B6F47',
  '#FFD700',
  '#FF6B6B',
  '#9B59B6',
]

interface Confetti {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
}

function generateConfetti(count: number): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1,
    duration: 2 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 8,
  }))
}

export default function RandomPicker() {
  const { compareList, setPosterConfig } = useAppStore()
  const { nameIds } = compareList
  const candidates = useMemo(
    () => nameIds.map(getNameById).filter(Boolean) as PetName[],
    [nameIds]
  )

  const [isRolling, setIsRolling] = useState(false)
  const [displayName, setDisplayName] = useState<PetName | null>(null)
  const [pickedName, setPickedName] = useState<PetName | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [confetti, setConfetti] = useState<Confetti[]>([])

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const allNames = useMemo(() => {
    if (candidates.length > 0) return candidates
    return NAME_DATABASE as unknown as PetName[]
  }, [candidates])

  const startRoll = () => {
    if (isRolling) return
    setIsRolling(true)
    setShowResult(false)
    setPickedName(null)
    setConfetti([])

    let tick = 0
    intervalRef.current = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * allNames.length)
      setDisplayName(allNames[randomIdx])
      tick++
    }, 80)

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      const finalIdx = Math.floor(Math.random() * allNames.length)
      const finalName = allNames[finalIdx]
      setDisplayName(finalName)
      setPickedName(finalName)
      setIsRolling(false)
      setShowResult(true)
      setConfetti(generateConfetti(50))
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleGeneratePoster = () => {
    if (pickedName) {
      setPosterConfig({ nameId: pickedName.id })
      window.location.hash = '#share'
    }
  }

  const disabled = !isRolling && allNames.length === 0

  return (
    <div className="relative w-full max-w-md">
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6 shadow-xl',
          'border border-orange-200/50'
        )}
      >
        <div className="relative z-10 flex flex-col items-center gap-4">
          {!showResult ? (
            <div
              className={cn(
                'flex h-32 w-full items-center justify-center rounded-2xl',
                'bg-gradient-to-br from-cream-100 to-white',
                'border-2 border-dashed border-orange-200'
              )}
            >
              <span
                className={cn(
                  'font-heading transition-all duration-75',
                  isRolling ? 'text-4xl text-brown-500' : 'text-5xl text-cream-200',
                  'transition-transform',
                  isRolling && 'scale-110'
                )}
              >
                {displayName ? displayName.name : '🎲'}
              </span>
            </div>
          ) : (
            <div className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-orange-100 via-pink-50 to-mint-50 border-2 border-orange-300 animate-fade-in-up">
              <div className="text-sm font-medium text-orange-500 animate-fade-in-up">
                天意之选 ✨
              </div>
              <span className="font-heading text-6xl text-orange-500 transition-all duration-500 animate-fade-in-up scale-150 text-shadow-strong">
                {pickedName?.name}
              </span>
              <div className="flex items-center gap-1 text-lg">
                <span>🎆</span>
                <span className="text-xs text-brown-400 font-english">
                  {pickedName?.pronunciation}
                </span>
                <span>🎆</span>
              </div>
            </div>
          )}

          {!showResult ? (
            <button
              onClick={startRoll}
              disabled={disabled}
              className={cn(
                'group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-4 font-heading text-lg text-white transition-all',
                disabled
                  ? 'cursor-not-allowed bg-gray-300'
                  : 'bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 bg-[length:200%_100%] shadow-lg shadow-orange-300/50 hover:shadow-xl animate-[float_3s_ease-in-out_infinite] hover:scale-[1.02]'
              )}
            >
              <span
                className={cn(
                  'absolute inset-0 -z-0 bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 bg-[length:200%_100%] opacity-0 transition-opacity',
                  !disabled && 'group-hover:animate-[pulse_2s_ease-in-out_infinite] group-hover:opacity-50'
                )}
              />
              <Dice1 className={cn('relative z-10 h-6 w-6', isRolling && 'animate-spin')} />
              <span className="relative z-10">
                {isRolling ? '抽取中...' : '🎲 开始抽签'}
              </span>
            </button>
          ) : (
            <div className="flex w-full gap-3 animate-fade-in-up">
              <button
                onClick={handleGeneratePoster}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-mint-400 py-3 font-heading text-white shadow-lg shadow-sky-200 transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <Image className="h-5 w-5" />
                <span>生成海报</span>
              </button>
              <button
                onClick={startRoll}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 py-3 font-heading text-white shadow-lg shadow-orange-200 transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <RefreshCw className="h-5 w-5" />
                <span>再抽一次</span>
              </button>
            </div>
          )}
        </div>

        {showResult && confetti.length > 0 && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl">
            {confetti.map((c) => (
              <div
                key={c.id}
                className="absolute animate-confetti rounded-sm"
                style={{
                  left: `${c.left}%`,
                  top: '-20px',
                  width: `${c.size}px`,
                  height: `${c.size * 0.4}px`,
                  backgroundColor: c.color,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}

        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pink-200/30 blur-3xl" />
      </div>
    </div>
  )
}
