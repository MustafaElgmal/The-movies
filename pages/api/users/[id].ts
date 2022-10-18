// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
type Data = {
  name?: string;
  message?: string;
  user?: User;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ message: "Id is required as params!" });
        } else {
          if (typeof id !== "string") {
            return res.status(400).json({ message: "Id must be string!" });
          }
        }
        const user = await prisma.user.findFirst({
          where: { id }
        });
        if (!user) {
          return res.status(404).json({ message: "user is not found!" });
        }
        res.status(200).json({ user });
      } catch (e) {
        res.status(400).json({ error: "Server is down!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
