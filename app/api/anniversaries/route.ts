import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/supabase'

export async function GET() {
  try {
    const anniversaries = await api.getAnniversaries()
    return NextResponse.json(anniversaries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch anniversaries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newAnniversary = await api.createAnniversary(body)
    return NextResponse.json(newAnniversary)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create anniversary' }, { status: 500 })
  }
}