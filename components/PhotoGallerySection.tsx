'use client'

import { PhotoGallery } from '@/lib/supabase'

export default function PhotoGallerySection({ photos }: { photos: PhotoGallery[] }) {
  return (
    <section className="glass rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3">🖼️</span>
        我们的记忆墙
      </h2>
      
      <p className="text-white/80 mb-6">
        珍藏我们一起度过的美好时光
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl overflow-hidden">
              {photo.image_url.startsWith('data:') || photo.image_url.startsWith('http') ? (
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                  📸
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <div className="text-white">
                <h3 className="font-semibold">{photo.title}</h3>
                {photo.description && (
                  <p className="text-sm text-white/80">{photo.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}