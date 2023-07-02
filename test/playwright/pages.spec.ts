import { test, expect } from "@playwright/test";

test("должна быть главная страница и она статична", async ({ page }) => {
  await page.goto("/hw/store");
  await expect(page).toHaveScreenshot();
});
test("должен быть каталог", async ({ page }) => {
  await page.route("/hw/store/api/products", async (route) => {
    const json = [
      {
        id: 0,
        name: "Tasty Bike",
        price: 503,
      },
      {
        id: 1,
        name: "Handcrafted Gloves",
        price: 591,
      },
    ];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog");
  await expect(page).toHaveScreenshot();
});
test("должна быть информация о доставке и она статична", async ({ page }) => {
  await page.goto("/hw/store/delivery");
  await expect(page).toHaveScreenshot();
});
test("должны быть контакты и они статичны", async ({ page }) => {
  await page.goto("/hw/store/contacts");
  await expect(page).toHaveScreenshot();
});
test("должна быть корзина если пустая, то тоже статична", async ({ page }) => {
  await page.goto("/hw/store/cart");
  await expect(page).toHaveScreenshot();
});

test("должна быть страница товара и верстка соответствует", async ({
  page,
}) => {
  await page.route("/hw/store/api/products/1", async (route) => {
    const json = {
      id: 1,
      name: "Tasty Bike",
      price: 503,
      description: "Wonderful bike",
      material: "Wood",
      color: "Red"
    };
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/1");
  await expect(page).toHaveScreenshot();
});
