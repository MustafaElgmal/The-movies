import { CategoryValidation } from "./../../../utils/validations";
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
        
        const errors = await CategoryValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const { id, name } = req.body;
        const category = await prisma.category.create({
          data: {
            id,
            name,
          },
        });
        res.status(201).json({ category });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    case "GET":
      try {
        const categories = await prisma.category.findMany();

        res.status(200).json({ categories });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
