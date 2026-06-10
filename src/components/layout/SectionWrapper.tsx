import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
  index?: number
}

const sectionEmojis: Record<string, string> = {
  quiz: '🎯',
  recommend: '💡',
  filter: '🎨',
  favorites: '💝',
  compare: '📊',
  share: '🎉',
}

const waveColors: Record<number, string> = {
  0: '#FFF9F2',
  1: '#EFE6D6',
  2: '#FFF9F2',
  3: '#EFE6D6',
  4: '#FFF9F2',
  5: '#EFE6D6',
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  index = 0,
}: SectionWrapperProps) {
  const emoji = sectionEmojis[id] || '✨'
  const waveColor = waveColors[index % 6] || '#FFF9F2'
  const nextWaveColor = waveColors[(index + 1) % 6] || '#EFE6D6'
  const delay = `${(index * 0.1).toFixed(1)}s`

  return (
    <section
      id={id}
      className="relative"
      style={{ backgroundColor: waveColor }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: delay }}
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="text-3xl md:text-4xl">{emoji}</span>
              <h2 className="font-zcool-kuaile text-3xl md:text-4xl text-brown-700">
                {title}
              </h2>
              <span className="text-3xl md:text-4xl">{emoji}</span>
            </div>
            {subtitle && (
              <p className="text-sm md:text-base text-brown-500 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent to-orange-300" />
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <div className="h-0.5 w-12 rounded-full bg-gradient-to-l from-transparent to-orange-300" />
            </div>
          </div>

          <div
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${(index * 0.1 + 0.1).toFixed(1)}s` }}
          >
            {children}
          </div>
        </div>
      </div>

      <svg
        className="w-full h-12 md:h-16 block"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={nextWaveColor}
        />
      </svg>
    </section>
  )
}
