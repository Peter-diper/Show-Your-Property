import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return NextResponse.json(
        { message: "you need to be logged in" },
        { status: 401 },
      );
    }
    const { userId } = userSession;

    const unreadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return NextResponse.json(unreadMessageCount, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "somethign went wrong" },
      { status: 500 },
    );
  }
};
