import { followValidation } from "../../../utils/validations";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const errors = await followValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const { userId, followerId } = req.body;
        const follow = await prisma.follower.create({
          data: {
            userId,
            followerId,
          },
        });
        res.status(201).json({ follow });
      } catch (e) {
        res.status(500).json({ message: "Server is dwon!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
