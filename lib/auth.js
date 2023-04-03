import { hash } from "bcryptjs";

export async function hashpassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verify(password, hashpassword) {
  const isValid = await compare(password, hashpassword);
  return isValid;
}
