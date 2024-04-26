import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@repo/db/client";
import { authOptions } from '@/lib/auth';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Internal server error1" });
    }
    console.log(session);
    //@ts-ignore
    const userId = session.user.id;

    //@ts-ignore
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "Internal server error2" });
    }
    const xp = user.xp;
    const username = user.username;
    const name = user.name;
    return NextResponse.json({ xp, username,name }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error3" });
  }
}

export async function POST(request: Request, res: NextApiResponse) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Internal server error1" });
    }

    const userIdString = session.user.name;
    const userId = userIdString ? parseInt(userIdString, 10) : undefined;
    console.log(userId);
    const res = await request.json();
    const newXP = res.newXP;

    if (!newXP) {
      return NextResponse.json({
        error: "New XP is missing in the request body",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { xp: newXP },
    });

    return NextResponse.json({ xp: updatedUser.xp }, { status: 200 });
  } catch (error) {
    console.error("Error updating user XP:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
