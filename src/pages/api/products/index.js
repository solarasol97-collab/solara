
// import formidable from "formidable";
// import fs from "fs/promises";
// import path from "path";
// import { prisma } from "../../../../lib/prisma";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const form = formidable({
//       multiples: true,
//       uploadDir: path.join(process.cwd(), "public/uploads"),
//       keepExtensions: true,
//     });

//     const parseForm = () =>
//       new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//           if (err) reject(err);
//           else resolve({ fields, files });
//         });
//       });

//     let uploadedFilePaths = [];

//     try {
//       const { fields, files } = await parseForm();

//       const normalizedFields = Object.fromEntries(
//         Object.entries(fields).map(([key, val]) => [key.trim(), val[0]?.trim()])
//       );

//       const { name, description, price, categoryId, tagIds } = normalizedFields;

//       const imageFiles = files.image
//         ? Array.isArray(files.image)
//           ? files.image
//           : [files.image]
//         : [];

//       if (
//         !name ||
//         !description ||
//         !price ||
//         !categoryId ||
//         imageFiles.length === 0 ||
//         imageFiles.length > 4
//       ) {
//         return res.status(400).json({
//           message: "All fields and 1 to 4 images are required.",
//         });
//       }

//       // Save paths for cleanup if needed
//       uploadedFilePaths = imageFiles.map((file) => file.filepath);

//       const category = await prisma.category.findUnique({
//         where: { id: parseInt(categoryId) },
//       });

//       if (!category) {
//         return res.status(400).json({
//           message: "Invalid categoryId",
//         });
//       }

//       const tagIdArray = tagIds
//         ? JSON.parse(tagIds).map((id) => ({ id: parseInt(id) }))
//         : [];

//       const product = await prisma.product.create({
//         data: {
//           name,
//           description,
//           price: parseFloat(price),
//           categoryId: category.id,
//           tags: {
//             connect: tagIdArray,
//           },
//         },
//       });

//       await Promise.all(
//         imageFiles.map((file) => {
//           const imagePath = `/uploads/${path.basename(file.filepath)}`;
//           return prisma.image.create({
//             data: {
//               url: imagePath,
//               productId: product.id,
//             },
//           });
//         })
//       );

//       const fullProduct = await prisma.product.findUnique({
//         where: { id: product.id },
//         include: {
//           category: true,
//           tags: true,
//           images: true,
//         },
//       });

//       return res.status(201).json({ message: "Product created", product: fullProduct });
//     } catch (error) {
//       console.error("Create error:", error);

//       // Cleanup orphaned files
//       if (uploadedFilePaths.length > 0) {
//         await Promise.all(
//           uploadedFilePaths.map(async (filePath) => {
//             try {
//               await fs.unlink(filePath);
//               console.log(`Deleted orphaned file: ${filePath}`);
//             } catch (err) {
//               console.warn(`Failed to delete file: ${filePath}`, err);
//             }
//           })
//         );
//       }

//       return res.status(500).json({ message: "Server error", error: error.message });
//     }
//   }

//   // ------------------ GET PRODUCTS --------------------
//   else if (req.method === "GET") {
//     try {
//       const { search, categoryId } = req.query;

//       const filters = {
//         AND: [
//           search
//             ? {
//                 OR: [
//                   { name: { contains: search, mode: "insensitive" } },
//                   { description: { contains: search, mode: "insensitive" } },
//                 ],
//               }
//             : {},
//           categoryId ? { categoryId: parseInt(categoryId) } : {},
//         ],
//       };

//       const products = await prisma.product.findMany({
//         where: filters,
//         include: {
//           category: true,
//           tags: true,
//           images: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });

//       return res.status(200).json(products);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       return res.status(500).json({ message: "Server error", error: error.message });
//     }
//   }

//   return res.status(405).json({ message: "Method Not Allowed" });
// }

import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../../../../lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Setup Cloudinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: true, keepExtensions: true });

    const parseForm = () =>
      new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

    try {
      const { fields, files } = await parseForm();

      // Normalize fields
      const normalizedFields = Object.fromEntries(
        Object.entries(fields).map(([key, val]) => [key.trim(), val[0]?.trim()])
      );

      const { name, description, price, categoryId, tagIds } = normalizedFields;

      // Validate fields
      const imageFiles = files.image
        ? Array.isArray(files.image)
          ? files.image
          : [files.image]
        : [];

      if (
        !name ||
        !description ||
        !price ||
        !categoryId ||
        imageFiles.length === 0 ||
        imageFiles.length > 4
      ) {
        return res.status(400).json({
          message: "All fields and 1 to 4 images are required.",
        });
      }

      // Check category
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(400).json({ message: "Invalid categoryId" });
      }

      const tagIdArray = tagIds
        ? JSON.parse(tagIds).map((id) => ({ id: parseInt(id) }))
        : [];

      // Create product
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          categoryId: category.id,
          tags: {
            connect: tagIdArray,
          },
        },
      });

      // Upload each image to Cloudinary and save URL
      await Promise.all(
        imageFiles.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.filepath, {
            folder: "nextjs-products",
          });

          await prisma.image.create({
            data: {
              url: result.secure_url,
              productId: product.id,
            },
          });
        })
      );

      // Return full product with relations
      const fullProduct = await prisma.product.findUnique({
        where: { id: product.id },
        include: {
          category: true,
          tags: true,
          images: true,
        },
      });

      return res.status(201).json({
        message: "Product created",
        product: fullProduct,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }

  // 🟦 Optional GET Handler for Fetching Products
  if (req.method === "GET") {
    try {
      const { search, categoryId } = req.query;

      const filters = {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          categoryId ? { categoryId: parseInt(categoryId) } : {},
        ],
      };

      const products = await prisma.product.findMany({
        where: filters,
        include: {
          category: true,
          tags: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(products);
    } catch (error) {
      console.error("Fetch error:", error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}

