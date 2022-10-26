// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const category = await prisma.category.findFirst({
          where: { id: +id! },
        });
        if (!category) {
          return res.status(404).json({ message: "Category is not found!" });
        }
        res.status(200).json({ category });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
