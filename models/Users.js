import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email already exist"],
      required: [true, "email is requierd"],
    },
    username: {
      type: String,
      required: [true, "Username shoul be uniq"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timeseries: true,
  },
);
const User = models.User || model("User", UserSchema);
export default User;
