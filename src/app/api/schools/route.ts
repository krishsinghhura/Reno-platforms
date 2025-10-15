import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import path from "path";
import { SchoolSchema, SchoolInput } from "../../../types/schoolTypes";
import { writeFile } from "fs/promises";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const data: Partial<SchoolInput> = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      contact: formData.get("contact") as string,
      email_id: formData.get("email_id") as string,
      image: formData.get("image") as unknown as File,
    };
    console.log("FormData object:", data);

    const parsed = SchoolSchema.safeParse(data);
    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map((err) => err.message);
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    const { name, address, city, state, contact, email_id, image } =
      parsed.data;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${image.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const imagePath = `/schoolImages/${filename}`;

    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        city,
        state,
        contact: BigInt(contact),
        email_id,
        image: imagePath,
      },
    });

    const schoolResponse = {
  ...newSchool,
  contact: newSchool.contact.toString(),
}

    return NextResponse.json(
      { message: "School added successfully", school: schoolResponse },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
