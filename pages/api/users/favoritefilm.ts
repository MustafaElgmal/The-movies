import { favoriteFilmValidation } from "./../../../utils/validations";
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
        const errors = await favoriteFilmValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const { userId, filmId } = req.body;
        const favoriteFilm = await prisma.favoriteFilm.create({
          data: {
            userId,
            filmId,
          },
        });
        res.status(201).json({ messaga: "favoriteFilm is delete!" });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
