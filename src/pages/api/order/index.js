// // pages/api/user/orders/index.js
// import { prisma } from "../../../../lib/prisma";
// import { authenticate } from "../../../../lib/middleware/auth";

// // Run Next.js-style middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, err => (err ? reject(err) : resolve()));
//   });
// }

// export default async function handler(req, res) {


//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin","*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // 1. Auth
//   try {
//     await runMiddleware(req, res, authenticate);
//   } catch {
//     // authenticate() already sent a 401
//     return;
//   }
//   const user = req.user;

//   // 2. Only POST
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { items , shippingAddress} = req.body;
//   if (!Array.isArray(items) || items.length === 0) {
//     return res
//       .status(400)
//       .json({ success: false, message: "`items` must be a non-empty array." });
//   }

//   try {
//     // 3. Extract IDs and load products
//     const productIds = items.map(i => i.productId);
//     const products = await prisma.product.findMany({
//       where: { id: { in: productIds } },
//       select: { id: true, price: true },
//     });

//     // 4. Check for missing products
//     const foundIds = new Set(products.map(p => p.id));
//     const missing = productIds.filter(id => !foundIds.has(id));
//     if (missing.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Products not found: ${[...new Set(missing)].join(", ")}`,
//       });
//     }

//     // 5. Build items + total
//     let totalAmount = 0;
//     const orderItems = items.map(({ productId, quantity }) => {
//       const price = products.find(p => p.id === productId).price;
//       totalAmount += price * quantity;
//       return { productId, quantity, price };
//     });

//     // 6. Create order
//     const order = await prisma.order.create({
//       data: {
//         userId: user.id,
//         totalAmount,
//         shippingAddress,
//         items: { create: orderItems },
//       },
//       include: { items: {
//         include: {product : true}
//       } },
//     });

//     return res.status(201).json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// }

import { prisma } from "../../../../lib/prisma";
import { authenticate } from "../../../../lib/middleware/auth";

// Run Next.js-style middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, err => (err ? reject(err) : resolve()));
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 1. Auth
  try {
    await runMiddleware(req, res, authenticate);
  } catch {
    // authenticate() already sent a 401
    return;
  }
  const user = req.user;

  // 2. Only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { items, shippingAddress, orderType } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "`items` must be a non-empty array." });
  }

  try {
    // 3. Extract IDs and load products
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
       where: { id: { in: productIds } },
       select: { id: true, price: true },
    });

    // 4. Check for missing products

    const foundIds = new Set(products.map(p => p.id))
    const missing = productIds.filter(id => !foundIds.has(id))
    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: `Products not found: ${[...new Set(missing)].join(", ")}`,
      });
    }

    // 5. Build items + total

    let totalAmount = 0;
    const orderItems = items.map(({ productId, quantity }) => {
      const qty = Number(quantity) || 0;
      const price = products.find(p => p.id === productId).price;
      totalAmount += price * qty;
      return { productId, quantity: qty, price };
    });

    // 5.a Validate / normalize orderType (enum values from prisma schema)
    const ALLOWED_ORDER_TYPES = ["takeaway", "delivery", "parking"];
    const normalizedOrderType = ALLOWED_ORDER_TYPES.includes(orderType) ? orderType : "delivery"; 

    // 6. Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        shippingAddress: shippingAddress || undefined,
        orderType: normalizedOrderType,
        items: { create: orderItems },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return res.status(201).json({ success: true, order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}