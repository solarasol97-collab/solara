import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  const productId = parseInt(req.query.id);

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true, tags: true , images:true },
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name, description, price, images, categoryId, tagIds } = req.body;

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          price: parseFloat(price),
          images,
          category: { connect: { id: categoryId } },
          tags: {
            set: tagIds.map((id) => ({ id })), // Replaces old tags
          },
        },
        include: {
          category: true,
          tags: true,
        },
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.product.delete({ where: { id: productId } });
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
