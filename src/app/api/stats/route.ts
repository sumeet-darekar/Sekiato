import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from a database
  const stats = {
    totalScans: 145,
    vulnerabilitiesFound: 23,
    projects: 12,
    activeIntegrations: 2,
  }
  return NextResponse.json(stats, { status: 200 })
}

