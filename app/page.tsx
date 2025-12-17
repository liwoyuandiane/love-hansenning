'use client'

import { useState, useEffect } from 'react'
import { api, WebsiteConfig, Anniversary, Wishlist, ExploreLocation, PhotoGallery } from '@/lib/supabase'
import LoveTimer from '@/components/LoveTimer'
import AnniversarySection from '@/components/AnniversarySection'
import WishlistSection from '@/components/WishlistSection'
import ExploreSection from '@/components/ExploreSection'
import PhotoGallerySection from '@/components/PhotoGallerySection'

export default function HomePage() {
  const [config, setConfig] = useState<WebsiteConfig | null>(null)
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([])
  const [wishlist, setWishlist] = useState<Wishlist[]>([])
  const [exploreLocations, setExploreLocations] = useState<ExploreLocation[]>([])
  const [photos, setPhotos] = useState<PhotoGallery[]>([])
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [configData, anniversariesData, wishlistData, exploreData, photosData] = await Promise.all([
        api.getWebsiteConfig(),
        api.getAnniversaries(),
        api.getWishlist(),
        api.getExploreLocations(),
        api.getPhotoGallery(),
      ])

      setConfig(configData)
      setAnniversaries(anniversariesData)
      setWishlist(wishlistData)
      setExploreLocations(exploreData)
      setPhotos(photosData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">加载失败，请检查网络连接</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg text-white overflow-x-hidden relative">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
      
      {/* 主要内容 */}
      <div className="relative z-10">
        {/* 顶部标题区域 */}
        <header className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            {config.couple_name_1} ❤ {config.couple_name_2}
          </h1>
          
          <div className="flex items-center justify-center my-6">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 mx-4"></div>
            <div className="text-pink-400 text-2xl">❤</div>
            <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 mx-4"></div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            我们的专属空间 | 记录每一个珍贵的瞬间
          </p>
          
          {/* 恋爱计时器 */}
          <LoveTimer anniversaryDate={config.anniversary_date} />
        </header>

        {/* 统计信息 */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{anniversaries.length}</div>
              <div className="text-white/80">纪念日</div>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105">
              <div className="text-3xl font-bold text-green-400 mb-2">{wishlist.length}</div>
              <div className="text-white/80">共同愿望</div>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-400 mb-2">{exploreLocations.length}</div>
              <div className="text-white/80">探索地点</div>
            </div>
          </div>
        </section>

        {/* 功能模块 */}
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          <AnniversarySection anniversaries={anniversaries} />
          <WishlistSection wishlist={wishlist} />
          <ExploreSection locations={exploreLocations} />
          <PhotoGallerySection photos={photos} />
        </div>

        {/* 页脚 */}
        <footer className="text-center py-12 mt-16">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg italic border-l-4 border-pink-400 pl-4">
              "真正的爱情故事永远不会结束，因为它们在心中永存。我爱你，不仅因为你是谁，还因为和你在一起时，我成为了更好的自己。"
            </p>
            <p className="mt-4 text-white/60">
              © {new Date().getFullYear()} {config.couple_name_1} ❤ {config.couple_name_2} | 我们的专属空间
            </p>
          </div>
        </footer>
      </div>

      {/* 音乐播放器 */}
      <div className="fixed bottom-8 right-8 glass rounded-full p-3 backdrop-blur-lg">
        <button
          onClick={toggleMusic}
          className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      {config.music_url && (
        <audio
          src={config.music_url}
          loop
          autoPlay={isPlaying}
          className="hidden"
        />
      )}
    </div>
  )
}