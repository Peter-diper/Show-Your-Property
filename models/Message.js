import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "proeprty is required!"],
    },
    name: {
      type: String,
      required: [true, "name is needed"],
    },
    email: {
      type: String,
      required: [true, "email is needed"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
