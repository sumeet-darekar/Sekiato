import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization token" },
        { status: 401 }
      )
    }

    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: authHeader,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const repos = await response.json()
    return NextResponse.json(repos)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    )
  }
}
