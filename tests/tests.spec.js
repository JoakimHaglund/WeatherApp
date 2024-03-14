const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/WeatherApp/index.html");
});

test("search for location", async ({ page }) => {
  let locationInput = page.locator("#location-input");
  await locationInput.fill("Amsterdam");
  await locationInput.press("Enter");
  await expect(page.getByText("Amsterdam")).toBeVisible();
});

test("check weather data fetching and display", async ({ page }) => {
  let locationInput = page.locator("#location-input");
  await locationInput.fill("Amsterdam");
  await locationInput.press("Enter");
  await page.waitForSelector(".container", { state: "visible" });

  const temperatureElement = await page.$(".temperature");
  expect(temperatureElement).not.toBeNull();

  const weatherIconElement = await page.$(".weatherIcons");
  expect(weatherIconElement).not.toBeNull();

  const precipitationElement = await page.$(".showPrecipitation");
  expect(precipitationElement).not.toBeNull();

  const windSpeedElement = await page.$(".showWindSpeed");
  expect(windSpeedElement).not.toBeNull();
});

test("check weather data display after switching forecast options", async ({
  page,
}) => {
  let locationInput = page.locator("#location-input");
  await locationInput.fill("Amsterdam");
  await locationInput.press("Enter");
  await page.waitForSelector(".container", { state: "visible" });

  const dailyForecastButton = await page.waitForSelector(
    'button:has-text("Daily Forecast")'
  );
  await dailyForecastButton.click();
  await page.locator(".temperature", { state: "visible" });

  const temperatureElementDaily = await page.$(".temperature");
  expect(temperatureElementDaily).not.toBeNull();

  const weeklyForecastButton = await page.waitForSelector(
    'button:has-text("7-Day Forecast")'
  );
  await weeklyForecastButton.click();
  await page.locator(".temperature", { state: "visible" });

  const temperatureElementWeekly = await page.$(".temperature");
  expect(temperatureElementWeekly).not.toBeNull();

  const fourteenDaysForecastButton = await page.waitForSelector(
    'button:has-text("14-Day Forecast")'
  );
  await fourteenDaysForecastButton.click();
  await page.locator(".temperature", { state: "visible" });

  const temperatureElementFourteenDays = await page.$(".temperature");
  expect(temperatureElementFourteenDays).not.toBeNull();
});
