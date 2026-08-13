import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    const typePattern = new RegExp(propertyType, "i");

    const query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.zipcode": locationPattern },
        { "location.state": locationPattern },
        { "location.city": locationPattern },
        { type: typePattern },
      ],
    };

    if (propertyType && propertyType !== "All") {
      query.type = typePattern;
    }
    const properties = await Property.find(query);

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 200 },
    );
  }
};
