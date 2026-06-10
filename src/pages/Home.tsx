import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import Navbar from '@/components/layout/Navbar'
import SectionWrapper from '@/components/layout/SectionWrapper'
import PreferenceQuiz from '@/components/quiz/PreferenceQuiz'
import RecommendSection from '@/components/recommend/RecommendSection'
import FilterPanel from '@/components/filter/FilterPanel'
import NameDetailDrawer from '@/components/detail/NameDetailDrawer'
import FavoritesSection from '@/components/favorites/FavoritesSection'
import CompareTable from '@/components/compare/CompareTable'
import SharePosterSection from '@/components/share/SharePosterSection'
import { PawPrint, Sparkles } from 'lucide-react'

export default function Home() {
  const generateNames = useAppStore((s) => s.generateNames)
  const recommendedNames = useAppStore((s) => s.recommendedNames)
  const userPreference = useAppStore((s) => s.userPreference)

  useEffect(() => {
    if (recommendedNames.length === 0) {
      generateNames()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prefsCount =
    (userPreference.catBreed || userPreference.dogBreed ? 1 : 0) +
    (userPreference.gender !== 'unknown' ? 1 : 0) +
    userPreference.coatColors.length +
    userPreference.personalities.length +
    userPreference.stylePreferences.length

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* Hero 欢迎区 */}
      <section id="hero" className="relative overflow-hidden pt-28 pb-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🐾</div>
          <div className="absolute top-20 right-20 text-7xl opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>🐱</div>
          <div className="absolute bottom-10 left-1/4 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🐶</div>
          <div className="absolute bottom-20 right-1/3 text-6xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🐾</div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>为你的毛孩子取一个独一无二的名字</span>
          </div>

          <h1
            className="font-heading text-5xl md:text-7xl text-brown-800 mb-6 text-shadow animate-fade-in-up leading-tight"
            style={{ animationDelay: '0.1s' }}
          >
            宠物起名工坊
            <span className="block text-4xl md:text-5xl mt-2 text-orange-500">
              🐾 名字 · 陪伴 · 一生 🐾
            </span>
          </h1>

          <p
            className="text-brown-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up font-noto-serif-sc"
            style={{ animationDelay: '0.2s' }}
          >
            回答 5 道小问题，为你的猫咪或狗狗定制专属名字方案。
            <br />
            精选 {prefsCount > 0 ? '' : '200+'} 古风、可爱、霸气、日系等多种风格，寓意美好，叫唤顺口！
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <button
              onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary px-8 py-3.5 text-lg rounded-full font-medium shadow-lg shadow-orange-200"
            >
              🎯 开始起名
            </button>
            <button
              onClick={() => document.getElementById('recommend')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary px-8 py-3.5 text-lg rounded-full font-medium"
            >
              ✨ 随便看看
            </button>
          </div>

          <div
            className="flex flex-wrap justify-center gap-8 mt-12 text-brown-500 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-orange-400" />
              <span>无需登录</span>
            </div>
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-mint-400" />
              <span>240+ 精选名字</span>
            </div>
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-pink-400" />
              <span>一键生成海报</span>
            </div>
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-sky-400" />
              <span>中 / 英 / 日 风格</span>
            </div>
          </div>
        </div>
      </section>

      {/* 区域1：偏好问答 */}
      <SectionWrapper
        id="quiz"
        index={1}
        title="🧠 偏好问答"
        subtitle="告诉我你的毛孩子是什么样子的，越准确推荐越贴心～（可跳过）"
      >
        <PreferenceQuiz />
      </SectionWrapper>

      {/* 区域2：名字推荐 */}
      <SectionWrapper
        id="recommend"
        index={2}
        title="✨ 名字推荐"
        subtitle="根据你的偏好精心挑选，点击爱心收藏，点击图标查看详情"
      >
        <RecommendSection />
      </SectionWrapper>

      {/* 区域3：风格筛选 */}
      <SectionWrapper
        id="filter"
        index={3}
        title="🎨 风格筛选"
        subtitle="更精细地调节名字的风格、字数、音节，还可以锁定某个字继续生成哦"
      >
        <FilterPanel />
      </SectionWrapper>

      {/* 区域5：收藏夹 */}
      <SectionWrapper
        id="favorites"
        index={4}
        title="❤️ 收藏夹"
        subtitle="把心动的名字存起来，慢慢挑选～"
      >
        <FavoritesSection />
      </SectionWrapper>

      {/* 区域6：对比清单 */}
      <SectionWrapper
        id="compare"
        index={5}
        title="⚖️ 对比清单"
        subtitle="把纠结的名字摆在一起，横向对比各项指标，实在选不出来？试试天意抽签！"
      >
        <CompareTable />
      </SectionWrapper>

      {/* 区域7：分享页 */}
      <SectionWrapper
        id="share"
        index={6}
        title="🖼️ 分享海报"
        subtitle="把最终选定的名字做成精美海报，分享给家人朋友，纪念这个特别的时刻"
      >
        <SharePosterSection />
      </SectionWrapper>

      {/* 页脚 */}
      <footer className="bg-brown-800 text-cream-100 py-10 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PawPrint className="w-6 h-6 text-orange-300" />
            <span className="font-heading text-2xl">宠物起名工坊</span>
          </div>
          <p className="text-brown-300 text-sm mb-2">
            每一个名字背后，都是一段独一无二的陪伴 🐾
          </p>
          <p className="text-brown-400 text-xs">
            © {new Date().getFullYear()} Pet Naming Workshop · Made with ❤️ for fur babies
          </p>
        </div>
      </footer>

      {/* 寓意详情抽屉（全局） */}
      <NameDetailDrawer />
    </div>
  )
}
