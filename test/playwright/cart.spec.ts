import { test, expect } from "@playwright/test";

test("можно сделать заказ", async ({
  page,
}) => {
  await page.goto("/hw/store/catalog/0");
  const addToCart = await page.getByRole('button', { name: 'Add to Cart' });
  await addToCart.click();
  await page.goto("/hw/store/cart");
  await page.waitForTimeout(1000);
  await (await page.getByLabel('Name')).type('John Doe');
  await (await page.getByLabel('Phone')).type('(123)-345-678-1234');
  await (await page.getByLabel('Address')).type('Hello world');
  await (await page.getByRole('button', { name: 'Checkout' })).click();

  const respCheckout = await page.waitForResponse(`/hw/store/api/checkout`);
  const response = await respCheckout.json();
  expect(response.id).toBeLessThan(10000);
});