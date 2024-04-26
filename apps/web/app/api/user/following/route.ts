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
    const userId = session.user.id;
    const following = await prisma.userFollowers.findMany({
        where: {
            //@ts-ignore
          userId: parseInt(userId),
        },
        include: {
          follower: true,
        },
      });
    const followingUsernames = following.map((item) => item.follower.username);
    return NextResponse.json({ following: followingUsernames });
  }catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error3" });
  }
}