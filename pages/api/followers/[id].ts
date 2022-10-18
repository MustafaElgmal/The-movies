// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.body) {
    case "GET":
      try {
        const { id } = req.query;
        const user = await prisma.user.findFirst({
          where: { id: id as string },
        });
        if (!user) {
          return res.status(404).json({ message: "user is not found!" });
        }
        const followers = await prisma.follower.findMany({
          where: { followerId: id as string },
        });
        res
          .status(200)
          .json({ followers, numberOfFollowers: followers.length });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
