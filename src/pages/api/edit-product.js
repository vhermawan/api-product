import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "PUT") {
    const {title, description, category} = req.body
    const { id }= req.query
    try {
      const updateProduct = await prisma.products.update({
        where: {
          id : parseInt(id),
        },
        data: {
          title,
          description,
          category,
        },
      });
      res.status(200).json({message:"sucess update data", updateProduct});
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}
