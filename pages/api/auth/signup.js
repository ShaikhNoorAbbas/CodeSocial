import { connectToDatabase } from "@lib/db";
import { hashpassword } from "@lib/auth";
async function handler(req, res) {
  const data = req.body;
  const { name, email, password } = data;
  const client = await connectToDatabase();
  const db = client.db();
  const hashedPassword = await hashpassword(password);
  const result = await db.collection("users").insertOne({
    name: name,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User Created Successfully!" });
}

export default handler;
