import { prisma } from "../../../../lib/prisma";

export const config = {
  api: {
    bodyParser: true, // ✅ users don't need formidable
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight request
  }

  try {
    // 📌 CREATE USER
    if (req.method === "POST") {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password, // ⚠️ Hash this before saving in real app
          role: role || "user",
        },
      });

      return res.status(201).json({ message: "User created", user });
    }

    // 📌 GET ALL USERS
    if (req.method === "GET") {
      const users = await prisma.user.findMany({
        include: {
          cart: true,
          orders: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(users);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("User API error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
