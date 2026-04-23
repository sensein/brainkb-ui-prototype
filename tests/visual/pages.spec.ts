import { test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

const PAGES = [
  "home",
  "explorer",
  "entity",
  "dashboard",
  "admin",
  "auth",
  "docs",
] as const;

for (const pageId of PAGES) {
  test(pageId, async ({ page }) => {
    await page.addInitScript((id) => {
      window.localStorage.setItem("bkb-page", id);
    }, pageId);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await argosScreenshot(page, pageId, { fullPage: true });
  });
}
