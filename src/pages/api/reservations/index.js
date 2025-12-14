import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const reservations = await prisma.reservation.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(reservations);
    }

    // if (req.method === "POST") {
    //   const { fullName, phoneNumber, email, guests, date, time, specialRequest } = req.body;

    //   // Basic validation
    //   if (!fullName || !phoneNumber || !guests || !date || !time) {
    //     return res.status(400).json({ message: "Missing required fields" });
    //   }

    //   const guestsInt = parseInt(guests, 10);
    //   if (isNaN(guestsInt)) {
    //     return res.status(400).json({ message: "Invalid guests number" });
    //   }

    //   const reservation = await prisma.reservation.create({
    //     data: {
    //       fullName,
    //       phoneNumber,
    //       email,
    //       guests: guestsInt,
    //       date: new Date(date),
    //       time,
    //       specialRequest,
    //     },
    //   });

    //   return res.status(201).json(reservation);
    // }

   if (req.method === "POST") {
      const { fullName, phoneNumber, email, guests, date, time, specialRequest } = req.body;

      // Basic validation
      if (!fullName || !phoneNumber || !guests || !date || !time) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const guestsInt = parseInt(guests, 10);
      if (isNaN(guestsInt)) {
        return res.status(400).json({ message: "Invalid guests number" });
      }

      const reservation = await prisma.reservation.create({
        data: {
          fullName,
          phoneNumber,
          email,
          guests: guestsInt,
          date: new Date(date),
          time,
          specialRequest,
          status: "pending", // Set default status
        },
      });

      return res.status(201).json(reservation);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Reservation API error:", error);
    return res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
