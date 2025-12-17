'use client'

import { ExploreLocation } from '@/lib/supabase'

export default function ExploreSection({ locations }: { locations: ExploreLocation[] }) {
  return (
    <section className="glass rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3">🗺️</span>
        探索地点
      </h2>
      
      <p className="text-white/80 mb-6">
        标记我们想去的地方和旅行计划，为下一次浪漫之旅做好准备。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <h3 className="font-semibold text-lg mb-2">{location.title}</h3>
            {location.description && (
              <p className="text-white/70 text-sm">{location.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}