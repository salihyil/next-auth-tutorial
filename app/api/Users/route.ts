import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body); // {formData: { name: 'qwerty', email: 'qwerty@gmail.com', password: '123456' }

    const userData = body.formData;

    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email }).lean().exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
