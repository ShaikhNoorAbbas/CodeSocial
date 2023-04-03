import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const result = await MongoClient.connect(
    "mongodb+srv://codeSocial:23474399@codesocial.dumkduh.mongodb.net/social?retryWrites=true&w=majority"
  );
  return result;
}
