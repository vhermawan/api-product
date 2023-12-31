import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === "GET") {
		try {
			const list = await prisma.wishes.findMany({
				orderBy: {
					createdAt: "desc",
				},
			});

			res.status(200).json({ message: "success get wishes", wishes: list });
		} catch (e) {
			res.status(500).json(e);
		}
	} else {
		res.status(405).json({ message: "method not allowed" });
	}
}
