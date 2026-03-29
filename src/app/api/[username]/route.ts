import { NextRequest, NextResponse } from "next/server";
import { parseQuery } from "@/core/query";
import { generateCard } from "@/core/generator";
import { buildErrorCard } from "@/core/card";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username || !/^[a-zA-Z0-9_]+$/.test(username)) {
    const svg = buildErrorCard("Invalid username");
    return new NextResponse(svg, {
      status: 400,
      headers: svgHeaders(0),
    });
  }

  try {
    const config = parseQuery(username, request.nextUrl.searchParams);
    const svg = await generateCard(config);

    return new NextResponse(svg, {
      status: 200,
      headers: svgHeaders(3600),
    });
  } catch (err) {
    console.error("Card generation error:", err);
    const svg = buildErrorCard("Something went wrong generating the card");
    return new NextResponse(svg, {
      status: 500,
      headers: svgHeaders(0),
    });
  }
}

function svgHeaders(maxAge: number): Record<string, string> {
  return {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": maxAge > 0
      ? `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`
      : "no-cache, no-store",
  };
}
