import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

// get/api/properies/id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    // getting params has bin changed slightly in next 15
    const { id: propertyId } = await params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { message: "property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "some thing went wrong" },
      { status: 500 },
    );
  }
};

export const DELETE = async (request, { params }) => {
  await connectDB();

  const { id: propertyId } = await params;

  if (!propertyId) {
    return NextResponse.json("could not find the property id", { status: 400 });
  }

  const session = await getUserSession();

  if (!session || !session.userId) {
    return NextResponse.json("unauthrized", { status: 400 });
  }

  const { userId } = session;

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json("could not find the property");
    }
    if (userId !== property.owner.toString()) {
      return NextResponse.json("property not found", { status: 401 });
    }

    await property.deleteOne();

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    const { userId, getUser } = userSession;

    if (!getUser) {
      return NextResponse.redirect("/");
    }

    const { id: propertyId } = await params;
    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json("propety not found", { status: 404 });
    }

    if (property.owner.toString() !== userId) {
      return NextResponse.json("unauthrized", { status: 401 });
    }

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData,
      { new: true },
    );

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
