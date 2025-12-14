// // pages/api/doordash/create-delivery.js   (Next.js API route example)
// import jwt from "jsonwebtoken";
// import { DoorDashClient } from "@doordash/sdk";
// import { v4 as uuidv4 } from "uuid";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const {
//     orderId,
//     customer, // {name, phone, email}
//     pickup,   // {name, instructions, address: {street, city, state, postal_code, country}, phone}
//     dropoff,  // same shape as pickup for customer delivery address
//     items = [], // optional
//     externalDeliveryId, // optional external id (string) - we'll generate if not provided
//   } = req.body;

//   if (!orderId || !pickup || !dropoff) {
//     return res.status(400).json({ message: "orderId, pickup and dropoff required" });
//   }

//   try {

//     const developerId = process.env.NEXT_PUBLIC_DOORDASH_DEVELOPER_ID;
//     const keyId = process.env.NEXT_PUBLIC_DOORDASH_KEY_ID;
//     const signingSecret = process.env.NEXT_PUBLIC_DOORDASH_SIGNING_SECRET;

//     if (!developerId || !keyId || !signingSecret) {
//       return res.status(500).json({ message: "Missing DoorDash credentials in env" });
//     }

//     const client = new DoorDashClient({
//     developer_id: developerId,
//     key_id:keyId,
//     signing_secret: signingSecret,
//     });

//     const response = await client.createDelivery({
//     external_delivery_id: uuidv4(),
//     pickup_address: "1000 4th Ave, Seattle, WA, 98104",
//     pickup_phone_number: "+1(650)5555555",
//     dropoff_address: "1201 3rd Ave, Seattle, WA, 98101",
//     dropoff_phone_number: "+1(650)5555555",
//     });

//     console.log(response,'response')
    
   
//     return res.status(200).json({ message: "delivery_created", delivery: data });
//   } catch (err) {
//     console.error("create-delivery error:", err);
//     return res.status(500).json({ message: "server error", error: err.message });
//   }
// }


// // pages/api/doordash/create-delivery.js
import { DoorDashClient } from "@doordash/sdk";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
      const client = new DoorDashClient({
      developer_id: process.env.DOORDASH_DEVELOPER_ID,
      key_id: process.env.DOORDASH_KEY_ID,
      signing_secret: process.env.DOORDASH_SIGNING_SECRET,
      });


    let response;
    try {
      response = await client.createDelivery({
        external_delivery_id: uuidv4(),
        pickup_address: "1000 4th Ave, Seattle, WA 98104",
        pickup_phone_number: "+16505555555",
        dropoff_address: "1201 3rd Ave, Seattle, WA 98101",
        dropoff_phone_number: "+16505555555",
      });
      console.error("=== DOORDASH SDK RAW ERROR ===");
      console.log(response,'response')
      // return res.status(200).json({ ok: true, response });
    }
   catch (sdkErr) {
    console.error("SDKErr ERROR:", sdkErr);
    return res.status(500).json({ sdk: true, message: sdkErr.message });
  }

}




// import fetch from "node-fetch";

// const DOORDASH_ENV = process.env.DOORDASH_ENV || "sandbox";
// const BASE =
//   process.env.DOORDASH_BASE_URL ||
//   (DOORDASH_ENV === "production"
//     ? "https://openapi.doordash.com/drive/v2"
//     : "https://openapi-sandbox.doordash.com/drive/v2");

// export const  apiDoorDash = async () =>  {
// try {
//     // Build JWT for DoorDash (HS256 with signing_secret). Confirm with your DD docs if RSA needed.
//     const developerId = process.env.NEXT_PUBLIC_DOORDASH_DEVELOPER_ID;
//     const keyId = process.env.NEXT_PUBLIC_DOORDASH_KEY_ID;
//     const signingSecret = process.env.NEXT_PUBLIC_DOORDASH_SIGNING_SECRET;
//     console.log(developerId,keyId,signingSecret,'Credentials')
//     if (!developerId || !keyId || !signingSecret) {
//       return res.status(500).json({ message: "Missing DoorDash credentials in env" });
//     }

//     const now = Math.floor(Date.now() / 1000);
//     // payload can be minimal: iss = developerId
//     const payload = {
//       iss: developerId,
//       iat: now,
//       exp: now + 60 * 5, // short expiry
//     };

//     const jwtOptions = {
//       algorithm: "HS256",
//       header: { kid: keyId, typ: "JWT" },
//     };

//     const token = jwt.sign(payload, signingSecret, jwtOptions);

//     // Build create-delivery payload according to Drive API (sandbox)
//     const extDeliveryId = externalDeliveryId || `D-${orderId}-${Date.now()}`;
//     const body = {
//       external_delivery_id: extDeliveryId,
//       quote_id: null, // optional: create quote first if using quoting
//       manifest: {
//         reference: `Order #${orderId}`,
//         external_reference_id: `${orderId}`,
//         orders: [
//           {
//             order_id: String(orderId),
//             pickup_details: {
//               name: pickup.name,
//               phone_number: pickup.phone,
//               address: {
//                 street: pickup.address.street,
//                 city: pickup.address.city,
//                 state: pickup.address.state,
//                 postal_code: pickup.address.postal_code,
//                 country: pickup.address.country || "US",
//               },
//               instructions: pickup.instructions || "Pickup at counter",
//             },
//             dropoff_details: {
//               name: dropoff.name,
//               phone_number: dropoff.phone,
//               address: {
//                 street: dropoff.address.street,
//                 city: dropoff.address.city,
//                 state: dropoff.address.state,
//                 postal_code: dropoff.address.postal_code,
//                 country: dropoff.address.country || "US",
//               },
//               instructions: dropoff.instructions || "Leave at door",
//             },
//             items: items.map((it) => ({
//               name: it.name,
//               quantity: it.quantity || 1,
//             })),
//           },
//         ],
//       },
//       // optional fields
//       metadata: {
//         order_id: String(orderId),
//       },
//     };

//     // POST to DoorDash Drive create delivery
//     const resp = await fetch(`${BASE}/deliveries`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await resp.json();

//     if (!resp.ok) {
//       console.error("DoorDash create-delivery error", resp.status, data);
//       return res.status(500).json({ message: "DoorDash error", details: data });
//     }

//     // Return DoorDash response to your frontend and/or persist to DB
//     return res.status(200).json({ message: "delivery_created", delivery: data });
//   } catch (err) {
//     console.error("create-delivery error:", err);
//     return res.status(500).json({ message: "server error", error: err.message });
//   }
    
// }