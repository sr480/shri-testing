import { test, expect } from "@playwright/test";

test("на странице с подробной информацией отображаются: название товара, его описание", async ({
  page,
}) => {
  const productId = 1;
  await page.goto(`/hw/store/catalog/${productId}`);
  const respProductDetails = await page.waitForResponse(`/hw/store/api/products/${productId}`);
  const response = await respProductDetails.json();
  expect(response.id).toBe(productId);
});