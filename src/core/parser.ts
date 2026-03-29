import * as cheerio from "cheerio";
import type { CodeChefUser, ContestEntry, SubmissionDay } from "./types";
import { getTierColor } from "./types";

export function parseProfile(html: string, username: string): CodeChefUser {
  const $ = cheerio.load(html);

  const name = extractName($);
  const currentRating = extractCurrentRating($);
  const highestRating = extractHighestRating($);
  const { stars, starColor: scrapedColor } = extractStars($);
  const starColor = scrapedColor || getTierColor(stars);
  const division = extractDivision($);
  const { globalRank, countryRank } = extractRanks($);
  const { country, countryCode } = extractCountry($);
  const avatarUrl = extractAvatar($);
  const problemsSolved = extractProblemsSolved($);
  const contestsParticipated = extractContestsParticipated($);
  const contestHistory = extractContestHistory(html);
  const submissionStats = extractSubmissionStats(html);

  return {
    username,
    name,
    currentRating,
    highestRating,
    stars,
    starColor,
    division,
    globalRank,
    countryRank,
    country,
    countryCode,
    avatarUrl,
    problemsSolved,
    contestsParticipated,
    contestHistory,
    submissionStats,
  };
}

function extractName($: cheerio.CheerioAPI): string | null {
  const el =
    $(".user-details-container h1").first().text().trim() ||
    $(".user-details-container .h2-style").first().text().trim();
  return el || null;
}

function extractCurrentRating($: cheerio.CheerioAPI): number | null {
  const text = $(".rating-number").first().text().trim();
  const n = parseInt(text, 10);
  return isNaN(n) ? null : n;
}

function extractHighestRating($: cheerio.CheerioAPI): number | null {
  const ratingHeader = $(".rating-header").text();
  const match = ratingHeader.match(/Highest Rating\s*(\d+)/i);
  if (match) return parseInt(match[1], 10);

  // fallback: look for parenthesized number near rating
  const ratingArea = $(".rating-ranks").text() + " " + $(".rating-header").text();
  const fallback = ratingArea.match(/\((?:Highest|Max)\s*(?:Rating)?\s*(\d+)\)/i);
  if (fallback) return parseInt(fallback[1], 10);

  // another fallback: small text with "Highest Rating"
  const small = $("small").filter((_, el) =>
    $(el).text().includes("Highest Rating")
  );
  if (small.length) {
    const m = small.text().match(/(\d+)/);
    if (m) return parseInt(m[1], 10);
  }

  return null;
}

function extractStars($: cheerio.CheerioAPI): {
  stars: number | null;
  starColor: string | null;
} {
  // Primary: count <span> children inside div.rating-star
  // Each span contains ★ and has inline background-color for the tier
  const starContainer = $(".rating-star").first();
  if (starContainer.length) {
    const spans = starContainer.find("span");
    if (spans.length > 0) {
      // Extract color from first span's inline style
      const style = spans.first().attr("style") || "";
      const colorMatch = style.match(/background-color:\s*(#[0-9a-fA-F]{3,8})/i);
      const starColor = colorMatch ? colorMatch[1] : null;
      return { stars: spans.length, starColor };
    }
  }

  // Fallback: the badge span.rating contains text like "7★"
  const badge = $("span.rating").first().text().trim();
  const badgeMatch = badge.match(/(\d+)\s*★/);
  if (badgeMatch) {
    const stars = parseInt(badgeMatch[1], 10);
    const style = $("span.rating").first().attr("style") || "";
    const colorMatch = style.match(/background:\s*(#[0-9a-fA-F]{3,8})/i);
    return { stars, starColor: colorMatch ? colorMatch[1] : null };
  }

  return { stars: null, starColor: null };
}

function extractRanks($: cheerio.CheerioAPI): {
  globalRank: number | null;
  countryRank: number | null;
} {
  let globalRank: number | null = null;
  let countryRank: number | null = null;

  $(".rating-ranks ul li").each((_, el) => {
    const text = $(el).text();
    if (/global/i.test(text)) {
      const m = text.match(/(\d+)/);
      if (m) globalRank = parseInt(m[1], 10);
    }
    if (/country/i.test(text)) {
      const m = text.match(/(\d+)/);
      if (m) countryRank = parseInt(m[1], 10);
    }
  });

  return { globalRank, countryRank };
}

function extractCountry($: cheerio.CheerioAPI): {
  country: string | null;
  countryCode: string | null;
} {
  const flagImg = $("img[src*='flags/']").first();
  let countryCode: string | null = null;
  let country: string | null = null;

  if (flagImg.length) {
    const src = flagImg.attr("src") || "";
    const codeMatch = src.match(/flags\/(\w+)\./i);
    if (codeMatch) countryCode = codeMatch[1].toLowerCase();

    // Country name near the flag
    const parent = flagImg.parent();
    const text = parent.text().trim();
    if (text) country = text;
  }

  return { country, countryCode };
}

function extractAvatar($: cheerio.CheerioAPI): string | null {
  const img =
    $(".user-details-container img").first().attr("src") ||
    $(".profileImage").first().attr("src") ||
    $("img.profileImage").first().attr("src");
  return img || null;
}

function extractDivision($: cheerio.CheerioAPI): string | null {
  // Plain <div> right after .rating-number, text like "(Div 1)"
  const ratingHeader = $(".rating-header").text();
  const m = ratingHeader.match(/\(Div\s*(\d+)\)/i);
  return m ? `Div ${m[1]}` : null;
}

function extractProblemsSolved($: cheerio.CheerioAPI): number | null {
  // <h3>Total Problems Solved: 632</h3> inside section.problems-solved
  const section = $("section.problems-solved").text();
  const m = section.match(/Total Problems Solved:\s*(\d+)/i);
  if (m) return parseInt(m[1], 10);

  // Fallback: any h3/h5 with "Total Problems Solved"
  const allText = $("h3, h5").filter((_, el) =>
    $(el).text().includes("Total Problems Solved")
  ).text();
  const f = allText.match(/(\d+)/);
  return f ? parseInt(f[1], 10) : null;
}

function extractContestsParticipated($: cheerio.CheerioAPI): number | null {
  // <div class="contest-participated-count">No. of Contests Participated: <b>102</b></div>
  const el = $(".contest-participated-count b").first().text().trim();
  const n = parseInt(el, 10);
  if (!isNaN(n)) return n;

  // Fallback from text
  const text = $(".contest-participated-count").text();
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function extractContestHistory(html: string): ContestEntry[] {
  const match = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) return [];
  try {
    return JSON.parse(match[1]);
  } catch {
    return [];
  }
}

function extractSubmissionStats(html: string): SubmissionDay[] {
  const match = html.match(
    /var\s+userDailySubmissionsStats\s*=\s*(\[[\s\S]*?\]);/
  );
  if (!match) return [];
  try {
    return JSON.parse(match[1]);
  } catch {
    return [];
  }
}
