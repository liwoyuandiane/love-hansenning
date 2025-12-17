'use client'

import { useState } from 'react'
import { api, WebsiteConfig } from '@/lib/supabase'

export default function ConfigEditor({ config, onUpdate }: { config: WebsiteConfig; onUpdate: () => void }) {
  const [formData, setFormData] = useState({
    couple_name_1: config.couple_name_1,
    couple_name_2: config.couple_name_2,
    anniversary_date: config.anniversary_date,
    music_url: config.music_url,
    background_style: JSON.stringify(config.background_style, null, 2),
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const updateData = {
        id: config.id,
        couple_name_1: formData.couple_name_1,
        couple_name_2: formData.couple_name_2,
        anniversary_date: formData.anniversary_date,
        music_url: formData.music_url,
        background_style: JSON.parse(formData.background_style),
      }

      await api.updateWebsiteConfig(updateData)
      setMessage('配置更新成功！')
      onUpdate()
    } catch (error) {
      setMessage('更新失败，请检查数据格式')
      console.error('Update failed:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">网站配置</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              第一个名字
            </label>
            <input
              type="text"
              name="couple_name_1"
              value={formData.couple_name_1}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              第二个名字
            </label>
            <input
              type="text"
              name="couple_name_2"
              value={formData.couple_name_2}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              纪念日日期
            </label>
            <input
              type="date"
              name="anniversary_date"
              value={formData.anniversary_date}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              背景音乐链接
            </label>
            <input
              type="url"
              name="music_url"
              value={formData.music_url}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/music.mp3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            背景样式 (JSON格式)
          </label>
          <textarea
            name="background_style"
            value={formData.background_style}
            onChange={handleChange}
            rows={6}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder='{"gradient": ["#1a1a2e", "#16213e", "#0f3460"]}'
          />
          <p className="text-gray-400 text-xs mt-1">
            使用有效的 JSON 格式，包含渐变颜色数组或其他样式配置
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-md ${
            message.includes('成功') ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'
          }`}>
            <p className={`text-sm ${
              message.includes('成功') ? 'text-green-200' : 'text-red-200'
            }`}>
              {message}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? '保存中...' : '保存配置'}
        </button>
      </form>
    </div>
  )
}