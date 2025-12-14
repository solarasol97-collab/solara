// pages/api/products/[id]/related.js
import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const productId = parseInt(req.query.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    // 🟩 GET all related products
    if (req.method === "GET") {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          relatedProducts: {
            include: { images: true, category: true, tags: true },
          },
        },
      });

      return res.status(200).json(product?.relatedProducts || []);
    }

    // 🟦 ADD related products
    if (req.method === "POST") {
      const { relatedIds } = req.body; // array of product ids

      if (!Array.isArray(relatedIds)) {
        return res.status(400).json({ message: "relatedIds must be an array" });
      }

      const updated = await prisma.product.update({
        where: { id: productId },
        data: {
          relatedProducts: {
            set: [], // clear old
            connect: relatedIds.map((id) => ({ id })),
          },
        },
        include: {
          relatedProducts: { include: { images: true, category: true, tags: true } },
        },
      });

      return res.status(200).json({
        message: "✅ Related products updated",
        relatedProducts: updated.relatedProducts,
      });
    }

    // 🟥 REMOVE a specific related product
    if (req.method === "DELETE") {
       const relatedId = parseInt(req.query.relatedId); // ✅ from URL param
      if (!relatedId) {
        return res.status(400).json({ message: "relatedId is required" });
      }

      const updated = await prisma.product.update({
        where: { id: productId },
        data: {
          relatedProducts: {
            disconnect: { id: relatedId },
          },
        },
        include: {
          relatedProducts: { include: { images: true, category: true, tags: true } },
        },
      });

      return res.status(200).json({
        message: "❌ Related product removed",
        relatedProducts: updated.relatedProducts,
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("❌ Related Products API error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
