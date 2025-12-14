import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const tagId = parseInt(req.query.id);


     // --- Handle Preflight Request ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
