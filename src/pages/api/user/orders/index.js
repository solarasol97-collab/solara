// pages/api/user/orders/list.js
// import { prisma } from "../../../../lib/prisma";
import { prisma } from "../../../../../lib/prisma";
import { authenticate } from "../../../../../lib/middleware/auth";


function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, err => (err ? reject(err) : resolve()));
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await runMiddleware(req, res, authenticate);
  } catch {
    return;
  }

  const user = req.user;
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      // include: {
      //   items: { include: { product: true } },
      // },
      include: {
      items: {
        include: {
          product: {
            include: {
              images: true,   // ✅ include images
              category: true, // (optional) include category
              tags: true      // (optional) include tags
            },
          },
        },
      },
    },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
