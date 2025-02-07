import { pinata } from "@/config/pinata";
import { NextResponse, NextRequest } from "next/server";
import { UploadOptions } from "pinata-web3";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const options: UploadOptions = {
      metadata: {
        name: file.name,
      },
      groupId: process.env.NEXT_PINATA_GROUP_ID,
      cidVersion: 1,
    };
    const uploadData = await pinata.upload.file(file as File, options);

    console.log("uploadData: ", uploadData);

    return NextResponse.json(
      { ipfsHash: uploadData.IpfsHash },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
