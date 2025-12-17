'use client'

import { useState, useEffect } from 'react'
import { api, ExploreLocation } from '@/lib/supabase'

export default function ExploreManager() {
  const [locations, setLocations] = useState<ExploreLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [newLocation, setNewLocation] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    visit_date: ''
  })

  useEffect(() => {
    loadLocations()
  }, [])

  const loadLocations = async () => {
    try {
      const locationsData = await api.getExploreLocations()
      setLocations(locationsData)
    } catch (error) {
      console.error('Failed to load locations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddLocation = async () => {
    if (!newLocation.title.trim()) return

    try {
      await api.createExploreLocation({
        title: newLocation.title,
        description: newLocation.description,
        location_coords: {
          latitude: parseFloat(newLocation.latitude) || 0,
          longitude: parseFloat(newLocation.longitude) || 0
        },
        visit_date: newLocation.visit_date || new Date().toISOString().split('T')[0]
      })
      
      setNewLocation({
        title: '',
        description: '',
        latitude: '',
        longitude: '',
        visit_date: ''
      })
      
      await loadLocations()
    } catch (error) {
      console.error('Failed to add location:', error)
    }
  }

  const handleDeleteLocation = async (id: string) => {
    try {
      await api.deleteExploreLocation(id)
      await loadLocations()
    } catch (error) {
      console.error('Failed to delete location:', error)
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
      <h2 className="text-2xl font-bold text-white mb-6">探索地点管理</h2>
      
      {/* 添加新地点表单 */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">添加新地点</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="地点名称"
            value={newLocation.title}
            onChange={(e) => setNewLocation({ ...newLocation, title: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="描述"
            value={newLocation.description}
            onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <input
            type="number"
            step="any"
            placeholder="纬度"
            value={newLocation.latitude}
            onChange={(e) => setNewLocation({ ...newLocation, latitude: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <input
            type="number"
            step="any"
            placeholder="经度"
            value={newLocation.longitude}
            onChange={(e) => setNewLocation({ ...newLocation, longitude: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded"
          />
          <input
            type="date"
            value={newLocation.visit_date}
            onChange={(e) => setNewLocation({ ...newLocation, visit_date: e.target.value })}
            className="bg-gray-600 text-white px-3 py-2 rounded md:col-span-2"
          />
        </div>
        <button
          onClick={handleAddLocation}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          添加地点
        </button>
      </div>

      {/* 地点列表 */}
      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-white">{location.title}</h4>
              <p className="text-gray-300">{location.description}</p>
              <p className="text-sm text-gray-400">
                坐标: {location.location_coords?.latitude || 'N/A'}, {location.location_coords?.longitude || 'N/A'} | 
                访问日期: {location.visit_date}
              </p>
            </div>
            <button
              onClick={() => handleDeleteLocation(location.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              删除
            </button>
          </div>
        ))}
        
        {locations.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            暂无探索地点记录
          </div>
        )}
      </div>
    </div>
  )
}