
import { DoorDashClient } from "@doordash/sdk";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
      const client = new DoorDashClient({
      developer_id: process.env.DOORDASH_DEVELOPER_ID,
      key_id: process.env.DOORDASH_KEY_ID,
      signing_secret: process.env.DOORDASH_SIGNING_SECRET,
      });

    let {dashOrderId} = req.body;
    console.log(dashOrderId,'address')
    let response;
    try {
      response = await client.deliveryQuoteAccept(dashOrderId);
      return res.status(200).json({ ok: true, response:response.data });
    }
   catch (sdkErr) {
    console.error("SDKErr ERROR:", sdkErr);
    return res.status(500).json({ sdk: true, message: sdkErr.message });
  }

}


