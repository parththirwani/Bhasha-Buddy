import { prisma } from "@repo/db/client";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: NextApiResponse) {
  try {
    const res = await request.json();
    const query = res.query;
    const searchResults = await prisma.user.findMany({
      where: {
        username: {
          contains: query, 
        },
      },
    });
    const formattedResults = searchResults.map((result) => ({
      id: result.id,
      username: result.username,
      email: result.email,
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Error updating user XP:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
