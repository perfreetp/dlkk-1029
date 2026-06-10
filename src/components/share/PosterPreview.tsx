import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { useAppStore } from '../../store/appStore'
import { PET_NAMES } from '../../data/nameDatabase'
import { getTemplateConfig } from '../../data/posterTemplates'
import type { PosterTemplateConfig } from '../../data/posterTemplates'
import { Image as ImageIcon } from 'lucide-react'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 1000

interface PawPrint {
  x: number
  y: number
  size: number
  opacity: number
}

const generatePawPrints = (count: number): PawPrint[] => {
  const prints: PawPrint[] = []
  for (let i = 0; i < count; i++) {
    prints.push({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      size: 15 + Math.random() * 25,
      opacity: 0.08 + Math.random() * 0.12,
    })
  }
  return prints
}

const drawPawPrint = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  opacity: number
) => {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = color

  const mainPadSize = size * 0.5
  const toeSize = size * 0.22
  const toeOffset = size * 0.45

  ctx.beginPath()
  ctx.ellipse(x, y + size * 0.2, mainPadSize * 0.7, mainPadSize * 0.55, 0, 0, Math.PI * 2)
  ctx.fill()

  const toePositions = [
    { dx: -toeOffset, dy: -toeOffset * 0.8 },
    { dx: -toeOffset * 0.35, dy: -toeOffset * 1.1 },
    { dx: toeOffset * 0.35, dy: -toeOffset * 1.1 },
    { dx: toeOffset, dy: -toeOffset * 0.8 },
  ]

  for (const pos of toePositions) {
    ctx.beginPath()
    ctx.ellipse(x + pos.dx, y + pos.dy, toeSize * 0.6, toeSize * 0.8, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

const drawStar = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  opacity: number
) => {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
    const px = x + size * Math.cos(angle)
    const py = y + size * Math.sin(angle)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const lines: string[] = []
  let currentLine = ''

  for (const char of text) {
    const testLine = currentLine + char
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine !== '') {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)

  return lines
}

const formatDate = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

interface PosterPreviewProps {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>
}

export default function PosterPreview({ canvasRef: externalCanvasRef }: PosterPreviewProps) {
  const internalCanvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef = externalCanvasRef || internalCanvasRef
  const [isLoading, setIsLoading] = useState(true)
  const posterConfig = useAppStore((state) => state.posterConfig)

  const selectedName = PET_NAMES.find((n) => n.id === posterConfig.nameId)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawPoster = async () => {
      setIsLoading(true)

      const template = getTemplateConfig(posterConfig.templateId)

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      gradient.addColorStop(0, template.bgGradient[0])
      gradient.addColorStop(1, template.bgGradient[1])
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      const pawPrints = generatePawPrints(25)
      for (const pp of pawPrints) {
        drawPawPrint(ctx, pp.x, pp.y, pp.size, template.pawPrintColor, pp.opacity)
      }

      const decorY = 120
      drawStar(ctx, 80, decorY, 18, template.accentColor, 0.3)
      drawStar(ctx, CANVAS_WIDTH - 80, decorY + 40, 14, template.accentColor, 0.25)
      drawStar(ctx, 100, decorY + 120, 10, template.accentColor, 0.2)
      drawStar(ctx, CANVAS_WIDTH - 100, decorY + 160, 16, template.accentColor, 0.22)

      ctx.save()
      ctx.font = '120px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(posterConfig.petEmoji, CANVAS_WIDTH / 2, 180)
      ctx.restore()

      ctx.save()
      ctx.strokeStyle = template.accentColor
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      const lineY = 270
      const lineWidth = 100
      ctx.beginPath()
      ctx.moveTo(CANVAS_WIDTH / 2 - lineWidth - 30, lineY)
      ctx.lineTo(CANVAS_WIDTH / 2 - 30, lineY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(CANVAS_WIDTH / 2 + 30, lineY)
      ctx.lineTo(CANVAS_WIDTH / 2 + lineWidth + 30, lineY)
      ctx.stroke()
      ctx.fillStyle = template.accentColor
      ctx.beginPath()
      ctx.arc(CANVAS_WIDTH / 2, lineY, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      if (selectedName) {
        ctx.save()
        ctx.font = 'bold 96px "Noto Serif SC", "Playfair Display", serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = template.textColor
        ctx.fillText(selectedName.name, CANVAS_WIDTH / 2, 400)
        ctx.restore()

        ctx.save()
        ctx.font = '32px "Noto Serif SC", serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = template.subtitleColor
        ctx.fillText(selectedName.pronunciation, CANVAS_WIDTH / 2, 490)
        ctx.restore()

        ctx.save()
        ctx.strokeStyle = template.accentColor
        ctx.globalAlpha = 0.4
        ctx.lineWidth = 1
        ctx.setLineDash([8, 6])
        ctx.beginPath()
        ctx.moveTo(120, 540)
        ctx.lineTo(CANVAS_WIDTH - 120, 540)
        ctx.stroke()
        ctx.restore()

        ctx.save()
        ctx.font = '26px "Noto Serif SC", serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillStyle = template.textColor
        const meaningLines = wrapText(ctx, selectedName.meaning, CANVAS_WIDTH - 200)
        const meaningStartY = 580
        const lineHeight = 42
        meaningLines.forEach((line, idx) => {
          ctx.fillText(line, CANVAS_WIDTH / 2, meaningStartY + idx * lineHeight)
        })
        ctx.restore()
      } else {
        ctx.save()
        ctx.font = 'bold 56px "Noto Serif SC", serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = template.subtitleColor
        ctx.globalAlpha = 0.5
        ctx.fillText('选择名字生成海报', CANVAS_WIDTH / 2, 400)
        ctx.font = '28px "Noto Serif SC", serif'
        ctx.fillText('从收藏夹或对比清单中挑选', CANVAS_WIDTH / 2, 480)
        ctx.restore()
      }

      try {
        const qrDataUrl = await QRCode.toDataURL(window.location.href, {
          width: 140,
          margin: 1,
          color: {
            dark: template.qrDarkColor,
            light: template.qrLightColor,
          },
        })
        const qrImage = document.createElement('img')
        qrImage.src = qrDataUrl
        await new Promise<void>((resolve) => {
          qrImage.onload = () => resolve()
        })
        const qrSize = 140
        const qrX = CANVAS_WIDTH / 2 - qrSize / 2
        const qrY = CANVAS_HEIGHT - 250
        ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize)

        ctx.save()
        ctx.strokeStyle = template.accentColor
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.6
        ctx.strokeRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16)
        ctx.restore()
      } catch {
        const qrSize = 140
        const qrX = CANVAS_WIDTH / 2 - qrSize / 2
        const qrY = CANVAS_HEIGHT - 250
        ctx.save()
        ctx.fillStyle = template.pawPrintColor
        ctx.fillRect(qrX, qrY, qrSize, qrSize)
        ctx.fillStyle = template.subtitleColor
        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('二维码生成中', CANVAS_WIDTH / 2, qrY + qrSize / 2)
        ctx.restore()
      }

      ctx.save()
      ctx.font = 'bold 32px "ZCOOL KuaiLe", "Noto Serif SC", cursive'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = template.textColor
      ctx.fillText('宠物起名工坊', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70)
      ctx.restore()

      ctx.save()
      ctx.font = '22px "Noto Serif SC", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = template.subtitleColor
      ctx.fillText(formatDate(), CANVAS_WIDTH / 2, CANVAS_HEIGHT - 30)
      ctx.restore()

      setIsLoading(false)
    }

    drawPoster()
  }, [posterConfig.templateId, posterConfig.nameId, posterConfig.petEmoji])

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative shadow-2xl bg-white rounded-3xl overflow-hidden p-4 sm:p-6" style={{ maxWidth: '500px' }}>
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-400 rounded-full animate-spin"></div>
              <div className="text-gray-500 font-medium flex items-center gap-2">
                <ImageIcon className="w-5 h-5 animate-pulse" />
                <span>海报渲染中...</span>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-2xl" style={{ maxHeight: '700px' }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-auto block origin-top"
            style={{
              transform: 'scale(1)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export { CANVAS_WIDTH, CANVAS_HEIGHT }
export type { PosterTemplateConfig }
