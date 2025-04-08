const { test, expect } = require('@playwright/test');

test.only('Special Locators', async ({ page }) => {
    page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill("nigga");
    await page.getByRole("button", {name:'Submit'}).click();
})