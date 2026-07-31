import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    // getting params has bin changed slightly in next 15
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json("user id is requierd", { status: 400 });
    }
    const properties = await Property.find({ owner: userId });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "some thing went wrong" },
      { status: 500 },
    );
  }
};
