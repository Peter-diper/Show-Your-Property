import User from "@/models/Users";
import connectDB from "@/config/db";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    if (!propertyId) {
      return NextResponse.json("property not found", { status: 401 });
    }

    const sessionUser = await getUserSession();

    if ((!sessionUser, !sessionUser?.userId)) {
      return NextResponse.json("unauthrized", { status: 401 });
    }

    const userId = sessionUser.userId;
    const user = await User.findById(userId);

    let hasBookmark = user.bookmarks.includes(propertyId);

    return NextResponse.json({ hasBookmark }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
