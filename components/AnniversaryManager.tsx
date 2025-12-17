'use client'

import { useState, useEffect } from 'react'
import { api, Anniversary } from '@/lib/supabase'

export default function AnniversaryManager() {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAnniversaries()
  }, [])

  const loadAnniversaries = async () => {
    try {
      const data = await api.getAnniversaries()
      setAnniversaries(data)
    } catch (error) {
      console.error('Failed to load anniversaries:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.createAnniversary({
        title: formData.title,
        description: formData.description,
        event_date: formData.event_date,
      })
      
      setFormData({ title: '', description: '', event_date: '' })
      setShowForm(false)
      await loadAnniversaries()
    } catch (error) {
      console.error('Failed to create anniversary:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这个纪念日吗？')) {
      try {
        await api.deleteAnniversary(id)
        await loadAnniversaries()
      } catch (error) {
        console.error('Failed to delete anniversary:', error)
      }
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">纪念日管理</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          {showForm ? '取消' : '添加纪念日'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">日期</label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? '保存中...' : '保存'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {anniversaries.map((anniversary) => (
          <div key={anniversary.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">{anniversary.title}</h3>
              <p className="text-gray-400 text-sm">
                {new Date(anniversary.event_date).toLocaleDateString('zh-CN')}
              </p>
              {anniversary.description && (
                <p className="text-gray-300 mt-1">{anniversary.description}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(anniversary.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}