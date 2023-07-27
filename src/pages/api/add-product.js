// pages/api/create-new.js
import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "POST") {
    const {title, description, category} = req.body
    try {
      const product = await prisma.products.create({
        data: {
          title,
          description,
          category,
        },
      });
      res.status(201).json({message:"success created product", product});
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}
