import { getServerSession } from "next-auth/next";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@repo/db/client";
import { authOptions } from '@/lib/auth';

export async function POST(request: Request, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Internal server error1" });
    }
    const userId = session.user.id;
    const res = await request.json();
    const title = res.title;
    const content = res.content;
    const user = await prisma.diaryEntry.create({
        data:{
            userId: userId,
            title,
            content
        }
    })
    console.log("Diary Entry Created Successfully");
    return NextResponse.json({ status: 200});
    }
    catch (error) {
    console.error("Error Updating Diary Entry", error);
    return NextResponse.json({ error: "Internal server error cant create Entry" });
    }
}

export async function GET(request: Request, res: NextApiResponse) {
    try {
      const session = await getServerSession(authOptions);
      console.log(session);
      if (!session || !session.user) {
        return NextResponse.json({ error: "Internal server error1" });
      }
      const userId = session.user.id;
      console.log(userId);
      const diaryEntries = await prisma.diaryEntry.findMany({
        where: {
            userId: userId,
      }})
      console.log("Fetched Diary Entries Successfully");
      return NextResponse.json({diaryEntries});
      }
      catch (error) {
      console.error("Error Feteching Diary Entry", error);
      return NextResponse.json({ error: "Internal server error cant create Entry" });
      }
  }