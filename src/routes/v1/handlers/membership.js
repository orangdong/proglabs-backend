import { PublicKey } from "@solana/web3.js";
import db from "../../../../db/db.js";
import metaplex from "../helpers/metaplex.js";
import config from "../../../../config/config.js";
const { main } = db;

const index = async (req, res, next) => {
  try {
    const nfts = await main.nft.findMany();

    return res.json({
      status: "success",
      message: "nfts fetched successfully",
      data: nfts.map((nft) => nft.mintAddress),
    });
  } catch (e) {
    next(e);
  }
};

const createNewNft = async (req, res, next) => {
  try {
    const { mintAddress } = req.body;
    const nft = await main.nft.create({
      data: {
        mintAddress,
      },
    });

    return res.json({
      status: "success",
      message: "Membership registered successfully",
      data: nft,
    });
  } catch (e) {
    next(e);
  }
};

const mintData = async (req, res, next) => {
  try {
    const getCandyMachine = await metaplex.candyMachines().findByAddress({
      address: new PublicKey(config.candyMachineId),
    });

    return res.json({
      status: "success",
      message: "Mint data fetched",
      data: {
        totalMinted: getCandyMachine.items.filter((cm) => cm.minted).length,
        totalItems: getCandyMachine.items.length,
        mintLimit: getCandyMachine.candyGuard.guards.mintLimit.limit,
        mintPrice:
          parseInt(
            getCandyMachine.candyGuard.guards.solPayment.amount.basisPoints.toString(
              10
            )
          ) / 1000000000,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default {
  index,
  createNewNft,
  mintData,
};
