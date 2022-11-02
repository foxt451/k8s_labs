import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as jose from "jose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicFilePath = path.resolve(__dirname, "keys/public.txt");
const pubKey = fs.readFileSync(publicFilePath);
export const publicKey = await jose.importSPKI(
  pubKey.toString(),
  process.env.SIGN_ALGO || "ES256"
);
