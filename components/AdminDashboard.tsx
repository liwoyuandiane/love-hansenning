'use client'

import { useState, useEffect } from 'react'
import { supabase, api, WebsiteConfig, Anniversary, Wishlist, ExploreLocation, PhotoGallery } from '@/lib/supabase'
import ConfigEditor from './ConfigEditor'
import AnniversaryManager from './AnniversaryManager'
import WishlistManager from './WishlistManager'
import ExploreManager from './ExploreManager'
import PhotoManager from './PhotoManager'

export default function AdminDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState('config')
  const [config, setConfig] = useState<WebsiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const configData = await api.getWebsiteConfig()
      setConfig(configData)
    } catch (error) {
      console.error('Failed to load config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">加载配置失败</div>
      </div>
    )
  }

  const tabs = [
    { id: 'config', label: '网站配置', icon: '⚙️' },
    { id: 'anniversary', label: '纪念日', icon: '📅' },
    { id: 'wishlist', label: '愿望清单', icon: '✨' },
    { id: 'explore', label: '探索地点', icon: '🗺️' },
    { id: 'photos', label: '照片墙', icon: '🖼️' },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 顶部导航 */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                {config.couple_name_1} ❤ {config.couple_name_2}
              </h1>
              <span className="ml-4 text-sm text-gray-400">后台管理系统</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 标签页导航 */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'config' && <ConfigEditor config={config} onUpdate={loadConfig} />}
        {activeTab === 'anniversary' && <AnniversaryManager />}
        {activeTab === 'wishlist' && <WishlistManager />}
        {activeTab === 'explore' && <ExploreManager />}
        {activeTab === 'photos' && <PhotoManager />}
      </main>
    </div>
  )
}