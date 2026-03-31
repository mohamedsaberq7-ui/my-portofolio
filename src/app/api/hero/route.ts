import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Hero from "@/models/Hero";

// GET — Fetch hero data
export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne();

    if (!hero) {
      return NextResponse.json(
        { message: "No hero data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hero, { status: 200 });
  } catch (error) {
    console.error("GET /api/hero error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT — Update hero data (creates if none exists)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create(body);
      return NextResponse.json(hero, { status: 201 });
    }

    Object.assign(hero, body);
    await hero.save();

    return NextResponse.json(hero, { status: 200 });
  } catch (error) {
    console.error("PUT /api/hero error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
