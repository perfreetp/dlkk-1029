import { useAppStore } from '@/store/appStore'
import { cn } from '@/lib/utils'

interface BatchActionBarProps {
  batchMode: boolean
  onToggleBatchMode: () => void
}

export default function BatchActionBar({ batchMode, onToggleBatchMode }: BatchActionBarProps) {
  const { favorites, toggleFavoriteSelect, removeFavorites, clearFavorites } = useAppStore()

  if (!batchMode) return null

  const selectedCount = favorites.filter((f) => f.selected).length
  const allSelected = favorites.length > 0 && selectedCount === favorites.length

  const handleToggleSelectAll = () => {
    if (allSelected) {
      favorites.forEach((f) => {
        if (f.selected) toggleFavoriteSelect(f.nameId)
      })
    } else {
      favorites.forEach((f) => {
        if (!f.selected) toggleFavoriteSelect(f.nameId)
      })
    }
  }

  const handleDeleteSelected = () => {
    const selectedIds = favorites.filter((f) => f.selected).map((f) => f.nameId)
    removeFavorites(selectedIds)
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 z-40 w-full max-w-3xl -translate-x-1/2 border-t border-orange-200/50 bg-white/95 p-4 shadow-2xl backdrop-blur-lg',
        'animate-fade-in-up'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-500">
            {selectedCount}
          </div>
          <div className="text-sm font-medium text-brown-600">
            已选 <span className="font-heading text-orange-500">{selectedCount}</span> 个
          </div>
        </div>

        <button
          onClick={handleToggleSelectAll}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all',
            allSelected
              ? 'bg-mint-200 text-mint-600 hover:bg-mint-300'
              : 'bg-cream-200 text-brown-500 hover:bg-cream-100'
          )}
        >
          {allSelected ? '取消全选' : '全选'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={clearFavorites}
            className="rounded-full border border-pink-300 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-500 transition-all hover:bg-pink-100"
          >
            清空全部
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedCount === 0}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium text-white transition-all',
              selectedCount > 0
                ? 'bg-gradient-to-r from-orange-400 to-pink-400 shadow-lg shadow-orange-200 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-300'
            )}
          >
            🗑️ 删除选中
          </button>
          <button
            onClick={onToggleBatchMode}
            className="rounded-full border border-cream-300 bg-cream-100 px-4 py-2 text-sm font-medium text-brown-500 transition-all hover:bg-cream-200"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}
