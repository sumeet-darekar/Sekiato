import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: "Ov23liccsAzHqQBf1vJl",
        client_secret: "1930fa2ab436c13d6ef3b3c3accf4b7f42e48502",
        code,
      }),
    })

    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error_description || 'Failed to exchange code')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to authenticate' },
      { status: 400 }
    )
  }
}
