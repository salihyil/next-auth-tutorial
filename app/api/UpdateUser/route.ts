import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userData = body.formData;

    // update name and role
    await db.user.update({
      where: {
        email: userData.email,
      },
      data: {
        name: userData.name,
        role: userData.role,
      },
    });

    return NextResponse.json({ message: "User updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
