import { useState } from 'react'
import { Download, Share2, Check, AlertCircle } from 'lucide-react'
import { PET_NAMES } from '../../data/nameDatabase'
import { useAppStore } from '../../store/appStore'

interface DownloadButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

export default function DownloadButton({ canvasRef }: DownloadButtonProps) {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const posterConfig = useAppStore((state) => state.posterConfig)

  const selectedName = PET_NAMES.find((n) => n.id === posterConfig.nameId)

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      setDownloadStatus('error')
      setTimeout(() => setDownloadStatus('idle'), 2000)
      return
    }

    try {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = selectedName
        ? `${selectedName.name}-宠物名.png`
        : '宠物起名海报.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloadStatus('success')
      setTimeout(() => setDownloadStatus('idle'), 2500)
    } catch {
      setDownloadStatus('error')
      setTimeout(() => setDownloadStatus('idle'), 2500)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyStatus('success')
      setTimeout(() => setCopyStatus('idle'), 2000)
    } catch {
      setCopyStatus('error')
      setTimeout(() => setCopyStatus('idle'), 2000)
    }
  }

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        <button
          onClick={handleDownload}
          className={`
            w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-lg
            transition-all duration-300 transform active:scale-[0.98]
            focus:outline-none focus:ring-4 focus:ring-offset-2
            ${downloadStatus === 'success'
              ? 'bg-green-500 text-white focus:ring-green-200 shadow-lg shadow-green-200'
              : downloadStatus === 'error'
              ? 'bg-red-500 text-white focus:ring-red-200 shadow-lg shadow-red-200'
              : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 focus:ring-orange-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:shadow-xl'
            }
          `}
        >
          {downloadStatus === 'success' ? (
            <>
              <Check className="w-6 h-6" />
              <span>已保存到下载文件夹</span>
            </>
          ) : downloadStatus === 'error' ? (
            <>
              <AlertCircle className="w-6 h-6" />
              <span>下载失败，请重试</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              <span>下载海报</span>
            </>
          )}
        </button>

        {downloadStatus === 'success' && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap animate-fade-in-up shadow-lg">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              海报下载成功！
            </span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={handleCopyLink}
          className={`
            w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold
            transition-all duration-300 border-2 active:scale-[0.98]
            focus:outline-none focus:ring-4 focus:ring-offset-2
            ${copyStatus === 'success'
              ? 'border-green-400 bg-green-50 text-green-700 focus:ring-green-100'
              : copyStatus === 'error'
              ? 'border-red-400 bg-red-50 text-red-700 focus:ring-red-100'
              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus:ring-orange-100'
            }
          `}
        >
          {copyStatus === 'success' ? (
            <>
              <Check className="w-5 h-5" />
              <span>链接已复制到剪贴板</span>
            </>
          ) : copyStatus === 'error' ? (
            <>
              <AlertCircle className="w-5 h-5" />
              <span>复制失败，请手动复制</span>
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5" />
              <span>复制链接分享给朋友</span>
            </>
          )}
        </button>

        {copyStatus === 'success' && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap animate-fade-in-up shadow-lg">
            <span>快去分享给好友吧！</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 pt-1">
        {selectedName ? (
          <>海报文件名：<span className="font-mono text-gray-500">{selectedName.name}-宠物名.png</span></>
        ) : (
          <span className="text-orange-400">选择名字后下载更个性化的海报</span>
        )}
      </p>
    </div>
  )
}
