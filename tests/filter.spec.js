const { test, expect } = require('@playwright/test');

test.only('Filter', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    const shop = page.getByRole("link",{name: 'Shop'})
    const checkout = page.locator("a[class='nav-link btn btn-primary']");

    await shop.click();

    //chaining multiple actions
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    await checkout.click();
    //comment--
});