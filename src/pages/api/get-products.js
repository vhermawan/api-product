import prisma from "../../../prisma/client";


export default async function handler(req, res) {
  if (req.method === "GET") {
    const { skip }= req.query;
    try {
      const list = await prisma.products.findMany({
        skip: parseInt(skip),
        take:10,
        orderBy: {
          createdAt: "desc",
        },
      });

      const countData = await prisma.products.count()

      res.status(200).json({ message:"success get products", totalData: countData, products: list });
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}