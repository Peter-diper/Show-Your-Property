import connectDB from "@/config/db";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

// GET /api/messages
export const GET = async (requset) => {
  try {
    await connectDB();

    const userSession = await getUserSession();
    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "you nees to be logged in" },
        { status: 500 },
      );
    }

    const { userId } = userSession;

    const messages = await Message.find({ recipient: userId })
      .populate("sender", "username")
      .populate("property", "name");

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};

// POST /api/messages
export const POST = async (requst) => {
  try {
    await connectDB();
    const { name, message, recipient, phone, property, email } =
      await requst.json();

    const userSession = await getUserSession();

    if ((!userSession, !userSession?.getUser)) {
      return NextResponse.json(
        { message: "You need to be LoggedIn!" },
        { status: 401 },
      );
    }

    if (recipient === userSession?.userId) {
      return NextResponse.json(
        {
          message: "You Can't send message to Yourself ",
        },
        { status: 400 },
      );
    }

    const newMessage = await new Message({
      sender: userSession?.userId,
      name,
      email,
      recipient,
      phone,
      property,
      body: message,
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "Message Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
    );
  }
};
