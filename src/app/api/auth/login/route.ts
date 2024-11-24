import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  // In a real application, you would validate the credentials against a database
  if (email === 'user@example.com' && password === 'password') {
    const user = { id: '1', email, name: 'John Doe' }
    return NextResponse.json({ user }, { status: 200 })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

