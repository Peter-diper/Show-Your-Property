import cloudinary from "@/config/coudinary";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import { NextResponse } from "next/server";

// GET  /API/PROPERTIES
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 3;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);
    return NextResponse.json({ properties, total }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "some thing went wrong" },
      { status: 500 },
    );
  }
};

// POST  /api/properties
export const POST = async (request) => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    const { userId } = userSession;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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

    let imagesUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert to base 64

      const imageBase64 = imageData.toString("base64");

      // upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "imagePulseTest",
        },
      );

      imagesUploadPromises.push(result.secure_url);

      // await all images to upload

      // add to propety data
    }
    const uploadedImages = await Promise.all(imagesUploadPromises);
    propertyData.images = uploadedImages;

    const newProperty = new Property(propertyData);
    await newProperty.save();
    console.log(newProperty._id);

    return NextResponse.json({ propertyId: newProperty._id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
