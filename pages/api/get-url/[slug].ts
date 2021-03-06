/* eslint-disable import/no-anonymous-default-export */
import { ShortLink } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"] as string;

  if (!slug || typeof slug !== "string") {
    return res.status(404).send({ error: "No slug provided" });
  }

  const data: ShortLink | null = await prisma.shortLink.findFirst({
    where: {
      slug,
    },
  });
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (!data) {
    res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");

    return res.status(404).send({ error: "No slug found" });
  }
  res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");

  return res.json(data);
};
