import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Skill from "@/models/Skill";

// GET — Fetch skill data
export async function GET() {
  try {
    await dbConnect();
    const skill = await Skill.findOne();

    if (!skill) {
      return NextResponse.json(
        { message: "No skill data found" },
        { status: 404 },
      );
    }

    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    console.error("GET /api/skill error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT — Update skill data (creates if none exists)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    let skill = await Skill.findOne();

    if (!skill) {
      skill = await Skill.create(body);
      return NextResponse.json(skill, { status: 201 });
    }

    Object.assign(skill, body);
    await skill.save();

    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    console.error("PUT /api/skill error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
