import { test, expect } from "@playwright/test";

test.describe("Firework page", () => {
  test("shows canvas and receives click", async ({ page }) => {
    await page.goto("/firework");

    const canvas = page.getByTestId("firework-canvas");
    await expect(canvas).toBeVisible();

    await canvas.click({ position: { x: 100, y: 200 } });

    await expect(canvas).toHaveAttribute("data-clicked", "true");
  });
});
