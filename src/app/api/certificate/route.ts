import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";

// GET — Fetch certificate data
export async function GET() {
  try {
    await dbConnect();
    const certificate = await Certificate.findOne();

    if (!certificate) {
      return NextResponse.json(
        { message: "No certificate data found" },
        { status: 404 },
      );
    }

    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error("GET /api/certificate error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT — Update certificate data (creates if none exists)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    let certificate = await Certificate.findOne();

    if (!certificate) {
      certificate = await Certificate.create(body);
      return NextResponse.json(certificate, { status: 201 });
    }

    Object.assign(certificate, body);
    await certificate.save();

    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error("PUT /api/certificate error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
