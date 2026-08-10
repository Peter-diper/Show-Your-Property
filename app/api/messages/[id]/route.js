import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// put /api/messages/:id

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;

    const userSession = await getUserSession();

    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "You need to be logged in" },
        { status: 401 },
      );
    }

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { message: "message not found" },
        { status: 404 },
      );
    }

    // Verify ownership

    if (message.recipient.toString() !== userSession?.userId) {
      return NextResponse.json({ authorized: false }, { status: 401 });
    }

    message.read = !message.read;

    await message.save();

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};

// delete /api/messages/:id

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;

    const userSession = await getUserSession();

    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "you need to be logged in" },
        { status: 401 },
      );
    }

    const deletedMessage = await Message.findById(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { message: "could not find the property" },
        { status: 400 },
      );
    }

    await deletedMessage.deleteOne();

    return NextResponse.json({}, { status: 200 });
  } catch (error) {}
};
