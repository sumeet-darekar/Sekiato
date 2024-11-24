import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would check the session and return the user if authenticated
  const user = { id: '1', email: 'user@example.com', name: 'John Doe' }
  return NextResponse.json({ user }, { status: 200 })
}

