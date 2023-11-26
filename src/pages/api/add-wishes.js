// pages/api/create-new.js
import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);
	if (req.method === "POST") {
		const { sender, wish } = req.body;
		try {
			const wishes = await prisma.wishes.create({
				data: {
					sender,
					wish,
				},
			});
			res.status(201).json({ message: "success created wishes", wishes });
		} catch (e) {
			res.status(500).json(e);
		}
	} else {
		res.status(405).json({ message: "method not allowed" });
	}
}
