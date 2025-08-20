import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id); // extract ID from URL

  try {
    if (req.method === "PUT") {
      const { name } = req.body;

      const category = await prisma.category.update({
        where: { id },
        data: { name },
      });

      return res.status(200).json({ message: "Category updated", category });
    }

    if (req.method === "DELETE") {
      await prisma.category.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Category deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
