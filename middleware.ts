import { NextApiRequest } from "next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname?.startsWith("/api/get-url")) {
    console.log(
      "RETURNING EARLY //////////////////////////////////////////////"
    );
    return;
  }

  const slug = req.nextUrl.pathname?.split("/").pop();

  if (slug) {
    const data = await (
      await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json();

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }
  }

  return;
}
