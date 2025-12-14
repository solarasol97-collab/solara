// pages/api/admin/orders/index.js
import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          product: {
            include: {
              images: true,   
              category: true, 
              tags: true  
            },
          },
        },
      },
    },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, orders: orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
