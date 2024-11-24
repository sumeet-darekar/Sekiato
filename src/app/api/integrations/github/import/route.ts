import { Octokit } from "@octokit/rest";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Define expected request body type
interface ImportRequestBody {
  repoFullName: string;
  repoUrl: string;
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    let body: ImportRequestBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Log sanitized request data
    console.log("Request body:", {
      repoFullName: body.repoFullName,
      repoUrl: body.repoUrl,
    });

    // Validate required fields
    if (!body.repoFullName || !body.repoUrl) {
      return NextResponse.json(
        { 
          message: "Missing required fields",
          details: {
            repoFullName: body.repoFullName ? "provided" : "missing",
            repoUrl: body.repoUrl ? "provided" : "missing"
          }
        },
        { status: 400 }
      );
    }

    // Validate repository URL format
    const githubUrlRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;
    if (!githubUrlRegex.test(body.repoUrl)) {
      return NextResponse.json(
        { message: "Invalid GitHub repository URL format" },
        { status: 400 }
      );
    }

    // Validate authorization
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Invalid authorization header format" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Missing authentication token" },
        { status: 401 }
      );
    }

    // Create project in database with error handling
    try {
      const project = await prisma.project.create({
        data: {
          name: body.repoFullName,
          repositoryUrl: body.repoUrl,
          provider: "github",
          status: "pending", // Add initial status
          importedAt: new Date(),
        },
      });

      return NextResponse.json({ 
        message: "Repository import initiated successfully",
        project 
      });
    } catch (error) {
      // Handle database-specific errors
      if (error instanceof Error) {
        if (error.message.includes("Unique constraint")) {
          return NextResponse.json(
            { message: "Repository already exists" },
            { status: 409 }
          );
        }
      }
      
      throw error; // Re-throw unexpected errors
    }
  } catch (error) {
    // Log error details securely
    console.error("Import error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      type: error instanceof Error ? error.constructor.name : typeof error,
    });

    return NextResponse.json(
      { message: "Failed to import repository. Please try again later." },
      { status: 500 }
    );
  }
}