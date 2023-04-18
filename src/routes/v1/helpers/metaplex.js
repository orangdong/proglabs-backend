import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { readFileSync } from "fs";
import config from "../../../../config/config.js";

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const metaplex = () => {
  const keyPairPath = config.solanaKeypair;
  let secretKey;
  if (isJsonString(keyPairPath) && Array.isArray(JSON.parse(keyPairPath))) {
    secretKey = Buffer.from(JSON.parse(keyPairPath));
  } else {
    const keyPairFile = readFileSync(keyPairPath);
    secretKey = Buffer.from(JSON.parse(keyPairFile.toString()));
  }

  const keypair = Keypair.fromSecretKey(secretKey);

  const connection = new Connection(clusterApiUrl(config.solanaNetwork));
  const metaplexObj = Metaplex.make(connection).use(keypairIdentity(keypair));

  return metaplexObj;
};

export default metaplex();
