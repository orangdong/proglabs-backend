import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

const mainDbConn = {
  url: `${process.env.DB_URL}`,
};

export default {
  port,
  host,
  mainDbConn,
};
