import prisma from "../../../prisma/client";
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

function runMiddleware(
  req,
  res,
  fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}



export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  
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