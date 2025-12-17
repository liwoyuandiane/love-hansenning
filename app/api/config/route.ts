import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/supabase'

export async function GET() {
  try {
    const config = await api.getWebsiteConfig()
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updatedConfig = await api.updateWebsiteConfig(body)
    return NextResponse.json(updatedConfig)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 })
  }
}