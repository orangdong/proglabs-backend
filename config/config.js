import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";
const appKey = process.env.APP_KEY || "";
const jwtSecret = process.env.JWT_SECRET || null;
const solanaNetwork = process.env.SOLANA_NETWORK || "devnet";
const solanaKeypair = process.env.SOLANA_KEYPAIR || null;
const candyMachineId = process.env.CANDY_MACHINE_ID || null;
const bucket = process.env.GCLOUD_STORAGE_BUCKET || "";

const mainDbConn = {
  url: `${process.env.DB_URL}`,
};

export default {
  port,
  host,
  mainDbConn,
  appKey,
  jwtSecret,
  solanaNetwork,
  solanaKeypair,
  candyMachineId,
  bucket,
};
