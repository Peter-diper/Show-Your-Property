import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

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

    const newMessage = await Message({
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
