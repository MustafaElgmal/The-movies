// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { filmValidation } from "../../../utils/validations";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const errors = filmValidation(req);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }
      try {
        const { page, category } = req.query;
        let films = [];
        if (category === "Popular") {
          films = await prisma.film.findMany({include: { raviews: true, rates: true },});
        } else {
          const categoryFind = await prisma.category.findFirst({
            where: { name: category as string },
          });
          if (!categoryFind) {
            return res.status(404).json({ message: "Category is not found!" });
          }
          films = await prisma.film.findMany({
            where: { filmGeners: { some: { categoryId: categoryFind.id } } },
            include: { raviews: true, rates: true },
          });
        }

        const pageNo = +page!;
        const limit = 8;
        const startIndx = (pageNo - 1) * limit;
        const endIndx = pageNo * limit;

        res.status(200).json({
          page,
          results: films.slice(startIndx, endIndx),
          total_pages: films.length / 8,
        });
      } catch (e) {
        res.status(200).json({ error: "Server is down!" });
      }

      break;
    default:
      res.status(200).json({ name: "Api is not found!" });
  }
}
