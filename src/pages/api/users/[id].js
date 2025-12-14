import { prisma } from "../../../../lib/prisma";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    // 📌 GET SINGLE USER
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          cart: true,
          orders: true,
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user);
    }

    // 📌 UPDATE USER
    if (req.method === "PUT") {
      const { name, email, password, role } = req.body;

      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          password, // ⚠️ Hash this in real app
          role,
        },
      });

      return res.status(200).json({ message: "User updated", user });
    }

    // 📌 DELETE USER
    if (req.method === "DELETE") {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: "User deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("User API error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
