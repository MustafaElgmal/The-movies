import { reviewsValidation } from "./../../../utils/validations";
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
        const errors = await reviewsValidation(req.body);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        const { text, userId }: { text: string; userId: string } = req.body;
        const review = await prisma.review.create({
          data: {
            text,
            userId,
            filmId: +id!,
          },
        });
        res.status(201).json({ review });
      } catch (e) {
        res.status(500).json({ error: "Server is down!" });
      }
      break;
    case "GET":
        try{
            const {id}=req.query
            const user=await prisma.user.findFirst({where:{id:id as string}})
            if(!user){
                return res.status(404).json({message:'User is not found!'})
            }
            const reviews=await prisma.review.findMany({where:{userId:id as string}})
            res.status(200).json({reviews})

        }catch(e){
            res.status(500).json({ error: "Server is down!" });

        }
       
      break;
    default:
      res.status(200).json({ message: "Api is not found!" });
  }
}
