// import { prisma } from "../../../../lib/prisma";

// export default async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//  // --- Handle Preflight Request ---
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
  
//   try {
//     if (req.method === "POST") {
//       const { name } = req.body;

//       if (!name) {
//         return res.status(400).json({
//           success: false,
//           message: "Category name is required",
//         });
//       }

//       const category = await prisma.category.create({ data: { name } });
//       return res.status(201).json({ message: "Category created", category });
//     }

//     if (req.method === "GET") {
//       const categories = await prisma.category.findMany({
//         orderBy: { id: "desc" },
//       });
//       return res.status(200).json(categories);
//     }

//     return res.status(405).json({ message: "Method Not Allowed" });
//   } catch (error) {
//     console.error("Category API Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// }


import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // --- Handle Preflight Request ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      const { name, status } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      const ALLOWED = ["available", "unavailable"];
      if (status !== undefined && !ALLOWED.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value. Allowed: available, unavailable",
        });
      }

      const data = { name };
      if (status !== undefined) data.status = status; // if omitted, Prisma default applies

      const category = await prisma.category.create({ data });
      return res.status(201).json({ message: "Category created", category });
    }

    if (req.method === "GET") {
      const categories = await prisma.category.findMany({
        orderBy: { id: "desc" },
      });
      return res.status(200).json(categories);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Category API Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}