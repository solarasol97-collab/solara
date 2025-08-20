// pages/api/user/cart/index.js
import { prisma } from "../../../../lib/prisma";
import { authenticate } from "../../../../lib/middleware/auth";

// Helper to run middleware manually
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the auth middleware
  await runMiddleware(req, res, authenticate);

  const user = req.user;

  if (req.method === "GET") {
    try {
      const cartItems = await prisma.cart.findMany({
        where: { userId: user.id },
        include: { 
            Product : true
        },
      });
      return res.status(200).json(cartItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Product ID and quantity are required",
        });
      }

       // check if the product exists
       const product = await prisma.product.findUnique({
        where:{
            id : productId
        }
       });

       if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found",
        })
       }

      const cartItem = await prisma.cart.create({
        data: {
          userId: user.id,
          productId,
          quantity,
        },
      });

      return res.status(201).json(cartItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
