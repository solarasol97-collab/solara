
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../../../../lib/prisma";

export const config = {
  api: {
    bodyParser: false, // required for formidable
  },
};

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_AVAILABILITY = ["available", "unavailable"];

export default async function handler(req, res) {
  // ✅ Handle CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 🟦 CREATE PRODUCT
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
     
      const { name, description, price, categoryId, tagIds,status } = normalizedFields;

      // Validate fields
      if (!name || !description || !price || !categoryId) {
        return res.status(400).json({
          message: "Name, description, price, and categoryId are required.",
        });
      }
        // Validate status if provided
      if (status !== undefined && !ALLOWED_AVAILABILITY.includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Allowed: ${ALLOWED_AVAILABILITY.join(", ")}`,
        });
      }

      // Handle images
      const imageFiles = files.image
        ? Array.isArray(files.image)
          ? files.image
          : [files.image]
        : [];

      if (imageFiles.length === 0 || imageFiles.length > 4) {
        return res.status(400).json({
          message: "You must upload between 1 and 4 images.",
        });
      }

      // Check category exists
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(400).json({ message: "Invalid categoryId" });
      }

      // Parse tags safely
      let tagIdArray = [];
      try {
        tagIdArray = tagIds ? JSON.parse(tagIds).map((id) => ({ id: parseInt(id) })) : [];
      } catch (err) {
        console.error("Tag parsing failed:", err);
        return res.status(400).json({ message: "Invalid tagIds format" });
      }
      // Create product
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          categoryId: category.id,
          tags: { connect: tagIdArray },
           status: status !== undefined ? status : undefined,
        },
      });

      // Upload images to Cloudinary
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

      // Fetch product with relations
      const fullProduct = await prisma.product.findUnique({
        where: { id: product.id },
        include: {
          category: true,
          tags: true,
          images: true,
        },
      });

      return res.status(201).json({
        message: "✅ Product created successfully",
        product: fullProduct,
      });
    } catch (error) {
      console.error("❌ Upload error:", error);
      return res.status(500).json({
        message: "Server error while creating product",
        error: error.message,
      });
    }
  }
  // 🟦 GET ALL PRODUCTS
if (req.method === "GET") {
  try {
    const { search, categoryId ,status} = req.query;
    
    // validate status filter if provided
      if (status !== undefined && !ALLOWED_AVAILABILITY.includes(status)) {
        return res.status(400).json({
          message: `Invalid status filter. Allowed: ${ALLOWED_AVAILABILITY.join(", ")}`,
        });
      }


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
          status ? { status } : {},
        ],
      };

    const products = await prisma.product.findMany({
      where: filters,
      include: {
        category: true,
        tags: true,
        images: true,
        relatedProducts: {
          include: {
            images: true,
            category: true,
            tags: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return res.status(500).json({
      message: "Server error while fetching products",
      error: error.message,
    });
  }
}


  return res.status(405).json({ message: "Method Not Allowed" });
}


// import { prisma } from "../../../../lib/prisma";

// export default async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // --- Handle Preflight Request ---
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     if (req.method === "POST") {
//       const { name, status } = req.body;

//       if (!name) {
//         return res.status(400).json({
//           success: false,
//           message: "Category name is required",
//         });
//       }

//       const ALLOWED = ["available", "unavailable"];
//       if (status !== undefined && !ALLOWED.includes(status)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid status value. Allowed: available, unavailable",
//         });
//       }

//       const data = { name };
//       if (status !== undefined) data.status = status; // if omitted, Prisma default applies

//       const category = await prisma.category.create({ data });
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
