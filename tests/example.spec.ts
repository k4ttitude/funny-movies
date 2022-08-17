import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("/");

  // Click text=Sign In
  await page.locator("text=Sign In").click();
  await expect(page).toHaveURL(
    "http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );

  // Expect email, password inputs to be visible
  await expect(page.locator('[name="email"]')).toBeVisible();
  await expect(page.locator('[name="password"]')).toBeVisible();

  // Expect Sign In button to be visible
  await expect(page.locator('[type="submit"]')).toBeVisible();
});
