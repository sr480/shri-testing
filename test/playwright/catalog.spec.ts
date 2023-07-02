import { test, expect } from "@playwright/test";

test("в каталоге должны отображаться товары, список которых приходит с сервера", async ({
  page,
}) => {
  await page.goto("/hw/store/catalog");
  await page.waitForResponse('/hw/store/api/products');
  const products = page.locator('.ProductItem');
  expect(await products.count()).toBeGreaterThan(0);
  
});

test("для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async ({
  page,
}) => {
  await page.goto("/hw/store/catalog");
  await page.waitForResponse('/hw/store/api/products');
  const products = page.locator('.ProductItem');
  for (let i = 0; i < await products.count(); i++) {
    await expect((await products.nth(i).locator('.ProductItem-Name').textContent())?.length).toBeGreaterThan(0);
    await expect(products.nth(i).locator('.ProductItem-Price:has-text("$")')).toBeTruthy();
    await expect(products.nth(i).locator('.ProductItem-DetailsLink:text("Details")')).toBeTruthy();
  }
});