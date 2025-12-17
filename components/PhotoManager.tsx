'use client'

import { useState, useEffect } from 'react'
import { api, PhotoGallery } from '@/lib/supabase'

export default function PhotoManager() {
  const [photos, setPhotos] = useState<PhotoGallery[]>([])
  const [loading, setLoading] = useState(true)
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    image_url: '',
    taken_date: ''
  })

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      const photosData = await api.getPhotoGallery()
      setPhotos(photosData)
    } catch (error) {
      console.error('Failed to load photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPhoto = async () => {
    if (!newPhoto.title.trim() || !newPhoto.image_url.trim()) return

    try {
      await api.createPhotoGalleryItem({
        title: newPhoto.title,
        description: newPhoto.description,
        image_url: newPhoto.image_url,
        image_type: 'url',
        taken_date: newPhoto.taken_date || new Date().toISOString().split('T')[0]
      })
      
      setNewPhoto({
        title: '',
        description: '',
        image_url: '',
        taken_date: ''
      })
      
      await loadPhotos()
    } catch (error) {
      console.error('Failed to add photo:', error)
    }
  }

  const handleDeletePhoto = async (id: string) => {
    try {
      await api.deletePhotoGallery(id)
      await loadPhotos()
    } catch (error) {
      console.error('Failed to delete photo:', error)
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
      <h2 className="text-2xl font-bold text-white mb-6">照片墙管理</h2>
      
      {/* 添加新照片表单 */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">添加新照片</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="照片标题"
            value={newPhoto.title}
            onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="图片URL"
            value={newPhoto.image_url}
            onChange={(e) => setNewPhoto({ ...newPhoto, image_url: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="描述"
            value={newPhoto.description}
            onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded md:col-span-2"
          />
          <input
            type="date"
            value={newPhoto.taken_date}
            onChange={(e) => setNewPhoto({ ...newPhoto, taken_date: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleAddPhoto}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          添加照片
        </button>
      </div>

      {/* 照片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-white mb-2">{photo.title}</h4>
              <p className="text-gray-300 text-sm mb-2">{photo.description}</p>
              <p className="text-gray-400 text-xs mb-3">拍摄日期: {photo.taken_date}</p>
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        ))}
        
        {photos.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-8">
            暂无照片记录
          </div>
        )}
      </div>
    </div>
  )
}