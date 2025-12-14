// pages/api/admin/orders/[id].js
import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);

  // FIX: Do NOT use req.headers.origin.
  // Use "*" exactly like index.js.
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { id } = req.query;
  console.log(id,'id')

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  if (req.method === "GET") {
    try {
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: {
            include: {
              product: {
                include: {
                  images: true,
                  category: true,
                  tags: true,
                },
              },
            },
          },
        },
      });

      return res.json({ success: true, order });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

if (req.method === "PUT") {
  try {
    const payload = req.body;

    delete payload.orderId; // <-- CRITICAL FIX

    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: payload,
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
                tags: true,
              },
            },
          },
        },
      },
    });

    return res.json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}


  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}
