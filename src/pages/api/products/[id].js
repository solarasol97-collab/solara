// import formidable from "formidable";
// import { v2 as cloudinary } from "cloudinary";
// import { prisma } from "../../../../lib/prisma";

// export const config = { api: { bodyParser: false } };

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const parseForm = (req) =>
//   new Promise((resolve, reject) => {
//     const form = formidable({ multiples: true, keepExtensions: true });
//     form.parse(req, (err, fields, files) =>
//       err ? reject(err) : resolve({ fields, files })
//     );
//   });

// // 🟢 Helper to normalize formidable fields (unwrap arrays)
// const normalizeFields = (fields) =>
//   Object.fromEntries(
//     Object.entries(fields).map(([key, val]) => [
//       key,
//       Array.isArray(val) ? val[0] : val,
//     ])
//   );

// export default async function handler(req, res) {
//   const { id } = req.query;
//   const productId = parseInt(id);

//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     if (req.method === "GET") {
//       const product = await prisma.product.findUnique({
//         where: { id: productId },
//         include: { category: true, tags: true, images: true },
//       });

//       if (!product)
//         return res.status(404).json({ message: "Product not found" });

//       return res.status(200).json(product);
//     }

//     if (req.method === "PUT") {
//       const { fields, files } = await parseForm(req);
//       const { name, description, price, categoryId, tagIds } =
//         normalizeFields(fields);

//       const updated = await prisma.product.update({
//         where: { id: productId },
//         data: {
//           name: name || undefined,
//           description: description || undefined,
//           price: price ? parseFloat(price) : undefined,
//           categoryId: categoryId ? parseInt(categoryId) : undefined,
//           tags: {
//             set: [],
//             connect: tagIds
//               ? JSON.parse(tagIds).map((id) => ({ id: parseInt(id) }))
//               : [],
//           },
//         },
//       });

//       // Replace images if new ones uploaded
//       if (files.image) {
//         await prisma.image.deleteMany({ where: { productId } });

//         const imageFiles = Array.isArray(files.image)
//           ? files.image
//           : [files.image];

//         await Promise.all(
//           imageFiles.map(async (file) => {
//             const result = await cloudinary.uploader.upload(file.filepath, {
//               folder: "nextjs-products",
//             });
//             await prisma.image.create({
//               data: { url: result.secure_url, productId },
//             });
//           })
//         );
//       }

//       const fullProduct = await prisma.product.findUnique({
//         where: { id: productId },
//         include: { category: true, tags: true, images: true },
//       });

//       return res
//         .status(200)
//         .json({ message: "Product updated", product: fullProduct });
//     }

//     if (req.method === "DELETE") {
//       await prisma.image.deleteMany({ where: { productId } });
//       await prisma.product.delete({ where: { id: productId } });

//       return res.status(200).json({ message: "Product deleted" });
//     }

//     return res.status(405).json({ message: "Method Not Allowed" });
//   } catch (error) {
//     console.error("API Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// }



import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../../../../lib/prisma";

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) =>
      err ? reject(err) : resolve({ fields, files })
    );
  });

// 🟢 Helper to normalize formidable fields (unwrap arrays)
const normalizeFields = (fields) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, val]) => [
      key,
      Array.isArray(val) ? val[0] : val,
    ])
  );

const ALLOWED_AVAILABILITY = ["available", "unavailable"];

export default async function handler(req, res) {
  const { id } = req.query;
  const productId = parseInt(id, 10);

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true, tags: true, images: true },
      });

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      return res.status(200).json(product);
    }

    if (req.method === "PUT") {
      const { fields, files } = await parseForm(req);
      const { name, description, price, categoryId, tagIds, status } =
        normalizeFields(fields);

      // validate status if provided
      if (status !== undefined && !ALLOWED_AVAILABILITY.includes(status)) {
        return res
          .status(400)
          .json({ message: `Invalid status. Allowed: ${ALLOWED_AVAILABILITY.join(", ")}` });
      }

      const updated = await prisma.product.update({
        where: { id: productId },
        data: {
          name: name || undefined,
          description: description || undefined,
          price: price ? parseFloat(price) : undefined,
          categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
          status: status !== undefined ? status : undefined,
          tags: {
            set: [],
            connect: tagIds
              ? JSON.parse(tagIds).map((id) => ({ id: parseInt(id, 10) }))
              : [],
          },
        },
      });

      // Replace images if new ones uploaded
      if (files.image) {
        await prisma.image.deleteMany({ where: { productId } });

        const imageFiles = Array.isArray(files.image)
          ? files.image
          : [files.image];

        await Promise.all(
          imageFiles.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.filepath, {
              folder: "nextjs-products",
            });
            await prisma.image.create({
              data: { url: result.secure_url, productId },
            });
          })
        );
      }

      const fullProduct = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true, tags: true, images: true },
      });

      return res
        .status(200)
        .json({ message: "Product updated", product: fullProduct });
    }

    if (req.method === "DELETE") {
      await prisma.image.deleteMany({ where: { productId } });
      await prisma.product.delete({ where: { id: productId } });

      return res.status(200).json({ message: "Product deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
