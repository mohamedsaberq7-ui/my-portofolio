import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";

// GET — Fetch experience data
export async function GET() {
  try {
    await dbConnect();
    const experience = await Experience.findOne();

    if (!experience) {
      return NextResponse.json(
        { message: "No experience data found" },
        { status: 404 },
      );
    }

    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    console.error("GET /api/experience error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT — Update experience data (creates if none exists)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    let experience = await Experience.findOne();

    if (!experience) {
      experience = await Experience.create(body);
      return NextResponse.json(experience, { status: 201 });
    }

    Object.assign(experience, body);
    await experience.save();

    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    console.error("PUT /api/experience error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
