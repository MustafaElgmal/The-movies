import {
  ratesValidation,
  reviewsValidation,
} from "./../../../utils/validations";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type Data = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const { id } = req.query;
        const errors = await ratesValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const { star, userId }: { star: number; userId: string } = req.body;
        const rate = await prisma.rate.create({
          data: {
            star,
            userId,
            filmId: +id!,
          },
        });
        res.status(201).json({ rate });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    case "GET":
      try {
        const { id } = req.query;
        const user = await prisma.user.findFirst({
          where: { id: id as string },
        });
        if (!user) {
          return res.status(404).json({ message: "User is not found!" });
        }
        const rates = await prisma.rate.findMany({
          where: { userId: id as string },
        });
        res.status(200).json({ rates });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }

      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
