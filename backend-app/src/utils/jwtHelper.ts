import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWE_SECRET);
const alg = "HS256";

export async function generateToken(data: string) {
  const token = await new jose.SignJWT({ data })
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string) {
  try {
    await jose.jwtVerify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
