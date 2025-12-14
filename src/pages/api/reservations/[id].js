import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const reservationId = parseInt(id, 10);

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // --- Handle Preflight ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      // ✅ Get single reservation
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
      });

      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      return res.status(200).json(reservation);
    }

    // if (req.method === "PUT") {
    //   // ✅ Update reservation
    //   const { fullName, phoneNumber, email, guests, date, time, specialRequest } =
    //     req.body;

    //   const updated = await prisma.reservation.update({
    //     where: { id: reservationId },
    //     data: {
    //       fullName: fullName || undefined,
    //       phoneNumber: phoneNumber || undefined,
    //       email: email || undefined,
    //       guests: guests ? parseInt(guests, 10) : undefined,
    //       date: date ? new Date(date) : undefined,
    //       time: time || undefined,
    //       specialRequest: specialRequest || undefined,
    //     },
    //   });

    //   return res
    //     .status(200)
    //     .json({ message: "Reservation updated", reservation: updated });
    // }
    if (req.method === "PUT") {
      // ✅ Update reservation
      const { fullName, phoneNumber, email, guests, date, time, specialRequest, status } = req.body;

      const updated = await prisma.reservation.update({
        where: { id: reservationId },
        data: {
          fullName: fullName || undefined,
          phoneNumber: phoneNumber || undefined,
          email: email || undefined,
          guests: guests ? parseInt(guests, 10) : undefined,
          date: date ? new Date(date) : undefined,
          time: time || undefined,
          specialRequest: specialRequest || undefined,
          status: status || undefined, // Allow status update
        },
      });

      return res
        .status(200)
        .json({ message: "Reservation updated", reservation: updated });
    }

    if (req.method === "DELETE") {
      // ✅ Delete reservation
      await prisma.reservation.delete({
        where: { id: reservationId },
      });

      return res.status(200).json({ message: "Reservation deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Reservation API Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
