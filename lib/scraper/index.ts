import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";
export async function scrapedAmazonProduct(productUrl: string) {
  if (!productUrl) return;
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const res = await axios.get(productUrl, options);
    const $ = cheerio.load(res.data);
    const title = $("#productTitle").text().trim();
    const description = $(".description").text().trim();
    const price = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $("a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";
    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    const data = {
      productUrl,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(price) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(price),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: 101,
      stars: 3.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(price) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(price),
      averagePrice: Number(price) || Number(originalPrice),
    };
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`failed to scrape ${error.message}`);
  }
}
