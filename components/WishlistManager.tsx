'use client'

import { useState, useEffect } from 'react'
import { api, Wishlist } from '@/lib/supabase'

export default function WishlistManager() {
  const [wishlist, setWishlist] = useState<Wishlist[]>([])
  const [loading, setLoading] = useState(true)
  const [newWish, setNewWish] = useState({
    title: '',
    description: '',
    is_completed: false
  })

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      const wishlistData = await api.getWishlist()
      setWishlist(wishlistData)
    } catch (error) {
      console.error('Failed to load wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddWish = async () => {
    if (!newWish.title.trim()) return

    try {
      await api.createWishlistItem(newWish)
      
      setNewWish({
        title: '',
        description: '',
        is_completed: false
      })
      
      await loadWishlist()
    } catch (error) {
      console.error('Failed to add wish:', error)
    }
  }

  const handleDeleteWish = async (id: string) => {
    try {
      await api.deleteWishlistItem(id)
      await loadWishlist()
    } catch (error) {
      console.error('Failed to delete wish:', error)
    }
  }

  const handleToggleComplete = async (item: Wishlist) => {
    try {
      await api.updateWishlistItem(item.id, { 
        is_completed: !item.is_completed 
      })
      await loadWishlist()
    } catch (error) {
      console.error('Failed to update wish:', error)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-white text-center">加载中...</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">愿望清单管理</h2>
      
      {/* 添加新愿望表单 */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">添加新愿望</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="愿望标题"
            value={newWish.title}
            onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <textarea
            placeholder="愿望描述"
            value={newWish.description}
            onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded h-20"
          />
        </div>
        <button
          onClick={handleAddWish}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          添加愿望
        </button>
      </div>

      {/* 愿望列表 */}
      <div className="space-y-4">
        {wishlist.map((item) => (
          <div key={item.id} className={`bg-gray-700 rounded-lg p-4 flex justify-between items-center ${
            item.is_completed ? 'border-l-4 border-green-400' : ''
          }`}>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <button
                  onClick={() => handleToggleComplete(item)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    item.is_completed 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {item.is_completed ? '✅ 已完成' : '标记完成'}
                </button>
              </div>
              {item.description && (
                <p className="text-gray-300">{item.description}</p>
              )}
              <p className="text-sm text-gray-400 mt-2">
                创建时间: {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDeleteWish(item.id)}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              删除
            </button>
          </div>
        ))}
        
        {wishlist.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            暂无愿望记录
          </div>
        )}
      </div>
    </div>
  )
}