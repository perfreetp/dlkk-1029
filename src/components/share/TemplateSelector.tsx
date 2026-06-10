import { useAppStore } from '../../store/appStore'
import { POSTER_TEMPLATES } from '../../data/posterTemplates'
import { Palette } from 'lucide-react'

export default function TemplateSelector() {
  const posterConfig = useAppStore((state) => state.posterConfig)
  const setPosterConfig = useAppStore((state) => state.setPosterConfig)

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-gray-800">选择模板风格</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {POSTER_TEMPLATES.map((template) => {
          const isSelected = posterConfig.templateId === template.value
          return (
            <button
              key={template.value}
              onClick={() => setPosterConfig({ templateId: template.value })}
              className={`
                relative group p-3 rounded-2xl border-2 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300
                ${isSelected
                  ? 'border-orange-400 ring-4 ring-orange-200 scale-105 bg-white shadow-lg'
                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md bg-white hover:scale-102'
                }
              `}
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 shadow-inner relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${template.bgGradient[0]} 0%, ${template.bgGradient[1]} 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                    <div className="text-3xl sm:text-4xl select-none">🐾</div>
                    <div
                      className="w-full h-1.5 rounded-full"
                      style={{ backgroundColor: template.previewColors[2], opacity: 0.6 }}
                    />
                    <div
                      className="w-3/4 h-1 rounded-full"
                      style={{ backgroundColor: template.previewColors[2], opacity: 0.4 }}
                    />
                  </div>

                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {template.previewColors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div
                    className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full opacity-10"
                    style={{ backgroundColor: template.pawPrintColor }}
                  />
                  <div
                    className="absolute top-6 right-4 w-3 h-3 rounded-full opacity-10"
                    style={{ backgroundColor: template.pawPrintColor }}
                  />
                </div>
              </div>

              <div className="text-center">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isSelected ? 'text-orange-600' : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {template.label}
                </p>
              </div>

              {isSelected && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
