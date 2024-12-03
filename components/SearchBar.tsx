"use client";
import React, { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "../lib/actions";

function isValidAmazonProductUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostName = parsedUrl.hostname;
    if (
      hostName.includes("amazon.com") ||
      hostName.includes("amazon.") ||
      hostName.endsWith("amazon")
    ) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
  return false;
}

function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = isValidAmazonProductUrl(searchValue);
    if (!isValid) alert("Please provide a valid amazon link");
    try {
      setLoading(true);
      const product = await scrapeAndStoreProduct(searchValue);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="searchbar-input"
        type="text"
        placeholder="Enter product link"
      />
      <button
        disabled={loading || searchValue === ""}
        type="submit"
        className="searchbar-btn"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
