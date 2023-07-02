import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/hw/store");

  await expect(page).toHaveTitle(/Example store/);
});

test("название магазина в шапке должно быть ссылкой на главную страницу", async ({
  page,
}) => {
  await page.goto("/hw/store");

  await expect(page.getByRole('link', { name: 'Example store' })).toHaveAttribute("href", "/hw/store/");
});

test("в шапке отображаются ссылки на страницы магазина", async ({ page }) => {
  await page.goto("/hw/store");

  await expect(page.getByRole('link', { name: 'Example store' })).toHaveAttribute("href", "/hw/store/");
  await expect(page.getByRole('link', { name: 'Catalog' })).toHaveAttribute("href", "/hw/store/catalog");
  await expect(page.getByRole('link', { name: 'Delivery' })).toHaveAttribute("href", "/hw/store/delivery");
  await expect(page.getByRole('link', { name: 'Contacts' })).toHaveAttribute("href", "/hw/store/contacts");
  await expect(page.getByRole('link', { name: 'Cart' })).toHaveAttribute("href", "/hw/store/cart");
});

test("на ширине меньше 576px навигационное меню должно скрываться за гамбургер", async ({
  page,
}) => {
  page.setViewportSize({ width: 575, height: 800 });
  await page.goto("/hw/store");

  await expect(page.getByRole("button", { name: "Toggle navigation" })).toBeVisible();
});
test("при выборе элемента из меню гамбургера, меню должно закрываться", async ({
  page,
}) => {
  page.setViewportSize({ width: 575, height: 800 });
  await page.goto("/hw/store");
  const burgerButton = page.getByRole("button", { name: "Toggle navigation" });
  await burgerButton.click();
  const catalogLink = page.getByRole("link", { name: "Catalog" });
  await expect(catalogLink).toBeVisible();
  await catalogLink.click();
  await expect(catalogLink).not.toBeVisible();
});

test("верстка должна адаптироваться под ширину экрана", async ({ page }) => {
  page.setViewportSize({ width: 575, height: 800 });
  await page.goto("/hw/store");

  await expect(page.getByRole("button", { name: "Toggle navigation" })).toBeVisible();
});
