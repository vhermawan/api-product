import prisma from "../../../prisma/client";


export default async function handler(req, res) {
  if (req.method === "GET") {
    const { skip }= req.query;
    try {
      const list = await prisma.products.findMany({
        skip,
        take:10,
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json({ message:"success get products", products: list });
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}