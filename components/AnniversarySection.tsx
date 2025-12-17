'use client'

import { Anniversary } from '@/lib/supabase'

export default function AnniversarySection({ anniversaries }: { anniversaries: Anniversary[] }) {
  return (
    <section className="glass rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3">📅</span>
        纪念日
      </h2>
      
      <p className="text-white/80 mb-6">
        记录我们所有重要的日子和特殊时刻，永远不会忘记我们的爱情里程碑。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {anniversaries.map((anniversary) => (
          <div key={anniversary.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <h3 className="font-semibold text-lg mb-2">{anniversary.title}</h3>
            <p className="text-pink-400 text-sm">
              {new Date(anniversary.event_date).toLocaleDateString('zh-CN')}
            </p>
            {anniversary.description && (
              <p className="text-white/70 text-sm mt-2">{anniversary.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}