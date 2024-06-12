import puppeteer from "puppeteer";

const puppySearch = async (text) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchTerm = text;

  await page.goto(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      searchTerm
    )}`
  );

  // Wait for the search results to load
  await page.waitForSelector("#video-title");

  // Extract the video ID of the first result
  const videoIdText = await page.evaluate(() => {
    return document
      .querySelector("#video-title")
      .getAttribute("href")
      .split("v=")[1];
  });

  const videoId = videoIdText.split("&")[0];
  console.log(`Video for ${searchTerm} : ${videoId}`);

  await browser.close();

  return videoId;
};

export default puppySearch;
