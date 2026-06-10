import { useRef } from 'react'
import PosterPreview from './PosterPreview'
import TemplateSelector from './TemplateSelector'
import DownloadButton from './DownloadButton'
import PosterConfigPanel from './PosterConfigPanel'
import { Share2 } from 'lucide-react'

export default function SharePosterSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 font-medium text-sm mb-4">
          <Share2 className="w-4 h-4" />
          <span>分享你的专属名字</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          生成专属分享海报
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          选择喜欢的模板风格，定制宠物表情，一键下载精美海报分享给朋友
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <TemplateSelector />
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <PosterConfigPanel />
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-800">保存与分享</h3>
              </div>
              <DownloadButton canvasRef={canvasRef} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-3xl shadow-xl p-4 sm:p-6 border border-orange-100">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="text-sm font-medium text-gray-500">海报预览</span>
              <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                800 × 1000 px
              </span>
            </div>
            <PosterPreview canvasRef={canvasRef} />
          </div>
        </div>
      </div>
    </section>
  )
}
