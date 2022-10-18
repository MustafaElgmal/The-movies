import { signInValidation } from './../../../utils/validations';
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
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const errors = await signInValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const {email,password}:{email:string,password:string}=req.body
        const user = await prisma.user.findFirst({ where: { email } });
        res.status(200).json({ user });
      } catch (e) {
        res.status(400).json({ error: "Server is down!" });
      }
      break;
    default:
      res.status(400).json({ message: "Api is not found!" });
  }
}
