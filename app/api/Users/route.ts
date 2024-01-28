import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userData = body.formData;

    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // check for duplicate emails
    const duplicate = await db.user.findUnique({ where: { email: userData.email } });

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await db.user.create({
      data: {
        ...userData,
      },
    });

    return NextResponse.json({ message: "User created." }, { status: 201 });
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
