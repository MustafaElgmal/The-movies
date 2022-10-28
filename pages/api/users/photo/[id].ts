import { photoValidation } from "./../../../../utils/validations";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const errors = photoValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const { id } = req.query;
        const { url }: { url: string } = req.body;
       

        const updateUser = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: {
            imageUrl: url,
          },
        });
        if (!updateUser) {
          return res.status(404).json({ message: "User is not found!" });
        }

        res.status(201).json({ user: updateUser });
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Server is down !" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
