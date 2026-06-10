import { Sparkles, Star } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import SectionWrapper from '@/components/layout/SectionWrapper'
import CategoryTabs from './CategoryTabs'
import NameCard from './NameCard'
import { cn } from '@/lib/utils'

function EmptyState() {
  return (
    <div
      className={cn(
        'relative py-16 md:py-24 px-6 rounded-2xl',
        'overflow-hidden',
        'bg-gradient-to-br from-cream-100/80 via-orange-50/50 to-mint-50/30',
        'border-2 border-dashed border-orange-200/60'
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%238B6F47' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 17c-1.5 0-3-1-3-3 0-2 1.5-4 3-4s3 2 3 4c0 2-1.5 3-3 3z'/%3E%3Cpath d='M8.5 10c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z'/%3E%3Cpath d='M15.5 10c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z'/%3E%3Cpath d='M4 13c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z'/%3E%3Cpath d='M20 13c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z'/%3E%3Cpath d='M12 20c-1 0-2-1-2-2h4c0 1-1 2-2 2z'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={cn(
            'relative mb-6',
            'animate-float'
          )}
        >
          <div
            className={cn(
              'absolute inset-0 -m-4 rounded-full',
              'bg-gradient-to-br from-orange-200/40 via-pink-200/30 to-mint-200/40',
              'blur-xl'
            )}
          />
          <div className="relative text-7xl md:text-8xl filter drop-shadow-lg">
            🐾
          </div>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-brown-700 mb-3">
          还没有推荐名字哦～
        </h3>

        <p className="text-brown-500 text-sm md:text-base max-w-md mb-6 leading-relaxed">
          去填写偏好问答，告诉我你家宠物的
          <br />
          <span className="text-orange-500 font-heading">品种、性格、喜好</span>
          ，AI 会为它量身定制好听的名字！
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['🐱 猫咪', '🐶 狗狗', '🎀 可爱', '👑 霸气', '📖 文艺'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-xs font-heading bg-white/60 text-brown-600 border border-orange-200/50 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          className={cn(
            'btn-primary flex items-center gap-2',
            'hover:scale-105 active:scale-100'
          )}
        >
          <Sparkles className="h-5 w-5" />
          <span>开始填写偏好</span>
        </button>
      </div>
    </div>
  )
}

export default function RecommendSection() {
  const recommendedNames = useAppStore((s) => s.recommendedNames)
  const generateNames = useAppStore((s) => s.generateNames)

  const hasNames = recommendedNames.length > 0

  return (
    <SectionWrapper
      title={
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl md:text-3xl text-brown-800">
            名字推荐
          </h2>
          {hasNames && (
            <span className="inline-flex items-center gap-1 text-sm text-brown-500 font-body bg-cream-200/60 px-3 py-1 rounded-full border border-orange-200/40">
              <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
              <span>
                共 <span className="text-orange-500 font-heading">{recommendedNames.length}</span> 个推荐
              </span>
            </span>
          )}
        </div>
      }
      subtitle="根据你家宠物的特点，AI 精选的好名字"
    >
      <div className="space-y-6">
        <CategoryTabs />

        {hasNames ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {recommendedNames.map((nameData, index) => (
              <NameCard key={nameData.id} nameData={nameData} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {hasNames && (
          <div className="flex justify-center pt-2">
            <button
              onClick={generateNames}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                'font-heading text-sm md:text-base',
                'bg-white/70 text-brown-600 border border-orange-200/60',
                'hover:bg-orange-50 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50',
                'transition-all duration-300 active:scale-95'
              )}
            >
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span>重新生成推荐</span>
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
