import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import About from "@/models/About";

// GET — Fetch about data
export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne();

    if (!about) {
      return NextResponse.json(
        { message: "No about data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT — Update about data (creates if none exists)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    let about = await About.findOne();

    if (!about) {
      about = await About.create(body);
      return NextResponse.json(about, { status: 201 });
    }

    Object.assign(about, body);
    await about.save();

    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
