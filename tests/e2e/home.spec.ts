import { expect, test } from "@playwright/test";

test("renders the primary sections and interactive content", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#intro")).toBeVisible();
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#testimonies")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  await expect(page.getByLabel("Your Email")).toBeVisible();
  await expect(page.getByLabel("Your message")).toBeVisible();
  await expect(page.getByRole("link", { name: "Github" })).toHaveAttribute(
    "href",
    "https://github.com/CharlieGarcia"
  );
});

test("toggles theme and keeps the choice after reload", async ({ page }) => {
  await page.goto("/");

  const label = page.locator("[data-theme-toggle]");
  const textSpan = page.locator("[data-theme-toggle-label]");

  await expect(textSpan).toHaveText("Light Mode");

  await label.click();

  await expect(textSpan).toHaveText("Dark Mode");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  await page.reload();

  await expect(textSpan).toHaveText("Dark Mode");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
