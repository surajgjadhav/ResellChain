import { pinata } from "@/config/pinata";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const metadata = await request.json();
    const uploadData = await pinata.upload.json(
      {
        metadata,
      },
      {
        groupId: process.env.NEXT_PINATA_GROUP_ID,
        metadata: { name: metadata.name },
      }
    );
    const tokenURI = await pinata.gateways.convert(uploadData.IpfsHash);
    return NextResponse.json({ tokenURI }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
