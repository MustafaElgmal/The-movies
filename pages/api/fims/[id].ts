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
        const user = await prisma.user.findFirst({
          where: { id: id as string },
        });
        if (!user) {
          return res.status(404).json({ message: "user is not found!" });
        }
        const favoriteFilms = await prisma.favoriteFilm.findMany({
          where: { userId: id as string },
        });
        res.status(200).json({ favoriteFilms });
      } catch (e) {
        res.status(500).json({ error: "Server is dwon!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
