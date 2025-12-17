'use client'

import { useState, useEffect } from 'react'

export default function LoveTimer({ anniversaryDate }: { anniversaryDate: string }) {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateTimer = () => {
      const startDate = new Date(anniversaryDate)
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTime({ years, months, days, hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [anniversaryDate])

  const timerUnits = [
    { value: time.years, label: '年' },
    { value: time.months, label: '月' },
    { value: time.days, label: '天' },
    { value: time.hours, label: '小时' },
    { value: time.minutes, label: '分钟' },
    { value: time.seconds, label: '秒' },
  ]

  return (
    <div className="glass rounded-2xl p-8 max-w-4xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-center mb-6 text-yellow-400">我们在一起的美好时光</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {timerUnits.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-white/70 mt-1">{unit.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}