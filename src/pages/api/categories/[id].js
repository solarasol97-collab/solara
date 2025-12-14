// import { prisma } from "../../../../lib/prisma";

// export default async function handler(req, res) {

//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin","*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   const id = parseInt(req.query.id); // extract ID from URL


//    // --- Handle Preflight Request ---
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     if (req.method === "PUT") {
//       const { name } = req.body;

//       const category = await prisma.category.update({
//         where: { id },
//         data: { name },
//       });

//       return res.status(200).json({ message: "Category updated", category });
//     }

//     if (req.method === "DELETE") {
//       await prisma.category.delete({
//         where: { id },
//       });

//       return res.status(200).json({ message: "Category deleted" });
//     }

//     return res.status(405).json({ message: "Method Not Allowed" });
//   } catch (error) {
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

  const id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid category id" });
  }

  // --- Handle Preflight Request ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "PUT") {
      const { name, status } = req.body;

      const ALLOWED = ["available", "unavailable"];
      if (status !== undefined && !ALLOWED.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const data = {};
      if (name !== undefined) data.name = name;
      if (status !== undefined) data.status = status;

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "No updatable fields provided" });
      }

      const category = await prisma.category.update({
        where: { id },
        data,
      });

      return res.status(200).json({ message: "Category updated", category });
    }

    if (req.method === "DELETE") {
      await prisma.category.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Category deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Category API Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}