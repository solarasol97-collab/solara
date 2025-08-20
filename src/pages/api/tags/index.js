import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tags = await prisma.tag.findMany();
      return res.status(200).json(tags);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;
      if(!name){
        return res.status(400).json({
          success : false,
          message: "Tag name is required"
        })
      }
      const tag = await prisma.tag.create({ data: { name } });
      return res.status(201).json(tag);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
