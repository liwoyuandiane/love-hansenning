'use client'

import { Wishlist } from '@/lib/supabase'

export default function WishlistSection({ wishlist }: { wishlist: Wishlist[] }) {
  return (
    <section className="glass rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3">✨</span>
        愿望清单
      </h2>
      
      <p className="text-white/80 mb-6">
        一起规划未来的梦想和目标，记录我们想要共同实现的愿望。
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {wishlist.map((item) => (
          <div key={item.id} className={`bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors ${
            item.is_completed ? 'border-l-4 border-green-400' : ''
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              {item.is_completed && (
                <span className="text-green-400 text-sm">✅ 已完成</span>
              )}
            </div>
            {item.description && (
              <p className="text-white/70 text-sm mt-2">{item.description}</p>
            )}
          </div>
        ))}
      </div>
      
      {wishlist.length === 0 && (
        <div className="text-center text-white/60 py-8">
          暂无愿望记录，开始规划你们的未来吧！
        </div>
      )}
    </section>
  )
}