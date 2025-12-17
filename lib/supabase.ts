import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库表类型定义
export interface WebsiteConfig {
  id: string
  couple_name_1: string
  couple_name_2: string
  anniversary_date: string
  music_url: string
  background_style: any
  created_at: string
  updated_at: string
}

export interface Anniversary {
  id: string
  title: string
  description?: string
  event_date: string
  created_at: string
  updated_at: string
}

export interface Wishlist {
  id: string
  title: string
  description?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface ExploreLocation {
  id: string
  title: string
  description?: string
  location_coords?: any
  created_at: string
  updated_at: string
}

export interface PhotoGallery {
  id: string
  title: string
  description?: string
  image_url: string
  image_type: 'url' | 'upload'
  created_at: string
  updated_at: string
}

// API 函数
export const api = {
  // 获取网站配置
  async getWebsiteConfig() {
    const { data, error } = await supabase
      .from('website_config')
      .select('*')
      .single()
    
    if (error) throw error
    return data as WebsiteConfig
  },

  // 更新网站配置
  async updateWebsiteConfig(config: Partial<WebsiteConfig>) {
    const { data, error } = await supabase
      .from('website_config')
      .update(config)
      .eq('id', config.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 纪念日相关
  async getAnniversaries() {
    const { data, error } = await supabase
      .from('anniversaries')
      .select('*')
      .order('event_date', { ascending: true })
    
    if (error) throw error
    return data as Anniversary[]
  },

  async createAnniversary(anniversary: Omit<Anniversary, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('anniversaries')
      .insert(anniversary)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteAnniversary(id: string) {
    const { error } = await supabase
      .from('anniversaries')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // 愿望清单相关
  async getWishlist() {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Wishlist[]
  },

  async createWishlistItem(wishlist: Omit<Wishlist, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('wishlist')
      .insert(wishlist)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateWishlistItem(id: string, updates: Partial<Wishlist>) {
    const { data, error } = await supabase
      .from('wishlist')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteWishlistItem(id: string) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // 探索地点相关
  async getExploreLocations() {
    const { data, error } = await supabase
      .from('explore_locations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as ExploreLocation[]
  },

  async createExploreLocation(location: Omit<ExploreLocation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('explore_locations')
      .insert(location)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteExploreLocation(id: string) {
    const { error } = await supabase
      .from('explore_locations')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // 照片墙相关
  async getPhotoGallery() {
    const { data, error } = await supabase
      .from('photo_gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as PhotoGallery[]
  },

  async createPhotoGalleryItem(photo: Omit<PhotoGallery, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('photo_gallery')
      .insert(photo)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deletePhotoGalleryItem(id: string) {
    const { error } = await supabase
      .from('photo_gallery')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // 文件上传
  async uploadFile(file: File, bucket: string = 'photos') {
    const fileName = `${Date.now()}-${file.name}`
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(fileName, file)
    
    if (error) throw error
    
    // 获取公开URL
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return publicUrl
  }
}