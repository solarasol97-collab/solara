import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  const tagId = parseInt(req.query.id);

  if (req.method === "GET") {
    try {
      const tag = await prisma.tag.findUnique({ where: { id: tagId } });
      return res.status(200).json(tag);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name } = req.body;
      const updatedTag = await prisma.tag.update({
        where: { id: tagId },
        data: { name },
      });
      return res.status(200).json(updatedTag);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.tag.delete({ where: { id: tagId } });
      return res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
