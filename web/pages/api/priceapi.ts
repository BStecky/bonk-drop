// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export const getPriceData = async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bonk&vs_currencies=usd"
  );
  console.log("result: ", res);
  return res.data.bonk.usd;
};

// https://api.coingecko.com/api/v3/simple/price?ids=bonk&vs_currencies=usd
