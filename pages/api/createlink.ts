import { ShortLink } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

// function that generates a randomstring of given length
function randomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const createLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const url: string = req.body?.url;
  const rngStr: string = randomString(8);

  try {
    const link = await prisma.shortLink.findFirst({
      where: {
        url,
      },
    });

    if (link) {
      return res.send({
        message: "Link already exists",
      });
    }

    const data: ShortLink = await prisma.shortLink.create({
      data: {
        slug: rngStr,
        url,
      },
    });

    return res.send({
      slug: data.slug,
    });
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

export default createLink;
