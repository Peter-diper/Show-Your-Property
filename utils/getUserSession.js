import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const getUserSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }

    return {
      userId: session.user.id,
      getUser: session.user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
