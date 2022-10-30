import { UserCreate } from "./../../../types";
import { UserValidation } from "./../../../utils/validations";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
type Data = {
  name?: string;
  message?: string;
  error?: string;
  errors?: {
    message: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const errors = await UserValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        let { id, fullName, email, password }: UserCreate = req.body;
        password = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
          data: {
            id: id!,
            fullName,
            email,
            password,
          },
        });
        res.status(201).json({ user });
      } catch (e) {
        console.log(e);

        res.status(500).json({ error: "Server is down!" });
      }
      break;
    case "GET":
      const users = await prisma.user.findMany();
      res.status(200).json({ users });
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
