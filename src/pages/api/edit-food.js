import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "PUT") {
    const { name, description, category, createdBy } = req.body
    const { id } = req.query
    try {
      const updateFood = await prisma.foods.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          description,
          category,
          createdBy,
        },
      });
      res.status(200).json({ message: "sucess update data", updateFood });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "method not allowed" })
  }
}
