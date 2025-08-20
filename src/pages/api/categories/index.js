import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "https://solara-6wxq.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    if (req.method === "POST") {
      const { name } = req.body;
      if(!name){
        return res.status(400).json({
          success : false,
          message : "Category name is required"
        })
      }
      const category = await prisma.category.create({ data: { name } });
      return res.status(201).json({ message: "Category created", category });
    }

    if (req.method === "GET") {
      const categories = await prisma.category.findMany();
      return res.status(200).json({ categories });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
