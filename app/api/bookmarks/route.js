import User from "@/models/Users";
import connectDB from "@/config/db";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";
import Property from "@/models/Property";
export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    if (!propertyId) {
      return NextResponse.json("property not found", { status: 401 });
    }

    const sessionUser = await getUserSession();

    if ((!sessionUser, !sessionUser?.userId)) {
      return NextResponse.json(
        { message: "user should be logged in" },
        { status: 401 },
      );
    }

    const userId = sessionUser.userId;
    const user = await User.findById(userId);

    let hasBookmark = user.bookmarks.includes(propertyId);
    let message;

    if (hasBookmark) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark is Removed";
      hasBookmark = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmard is Added";
      hasBookmark = true;
    }

    await user.save();
    return NextResponse.json({ message, hasBookmark }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    if ((!userSession, !userSession?.getUser)) {
      return NextResponse.json("userId is rquierd", { status: 401 });
    }

    const user = await User.findById(userSession.userId);

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
