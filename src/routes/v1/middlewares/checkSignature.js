import nacl from "tweetnacl";
import b58 from "bs58";
import { PublicKey } from "@solana/web3.js";

export default (req, res, next) => {
  const sigHeader = req.headers["x-auth-signature"];

  if (!sigHeader) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized, No signature provided",
    });
  }

  const message = new TextEncoder().encode(
    `Welcome to Proglabs,\nYour New Experience Learning Platform Partner!\n\nBefore continue using our services please click to sign in.\n\nNo password is required.\n\nYour authentication status will reset after 3 hour or after disconnecting your wallet.`
  );
  const { publicKey } = req.body;

  const hasValidSig = nacl.sign.detached.verify(
    message,
    b58.decode(sigHeader),
    new PublicKey(publicKey).toBytes()
  );

  if (!hasValidSig) {
    return res.status(401).json({
      status: "error",
      message: "Invalid signature",
    });
  }

  next();
};
