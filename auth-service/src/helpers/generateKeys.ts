import fs from "fs";
import path from "path";
import * as jose from "jose";

const generate = async () => {
  const { publicKey, privateKey } = await jose.generateKeyPair(
    process.env.SIGH_ALGO || "ES256"
  );
  const privEnc = await jose.exportPKCS8(privateKey);
  const pubEnc = await jose.exportSPKI(publicKey);

  const jwkPrivateFilePath = path.resolve("private.txt");
  const jwkPublicFilePath = path.resolve("public.txt");
  fs.writeFileSync(jwkPrivateFilePath, privEnc);
  fs.writeFileSync(jwkPublicFilePath, pubEnc);
};

generate();
