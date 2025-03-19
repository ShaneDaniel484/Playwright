const { test, expect } = require('@playwright/test');

test.only('Place Order', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // elements
    const emailId = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const products = page.locator(".card-body");
    const productName = page.locator(".card-body b");
    const productToBeAdded = "ADIDAS ORIGINAL";
    const cartBtn = page.locator("[routerlink='/dashboard/cart']");
    const checkoutBtn = page.locator("button:has-text('Checkout')");

    // actions
    await page.goto("https://rahulshettyacademy.com/client/");
    await emailId.fill("playwrightomm@gmail.com");
    await password.fill("Test@123");
    await loginBtn.click();
    await expect(page).toHaveTitle("Let's Shop");
    await page.waitForLoadState('networkidle');
    const count = await products.count();
    const productList = await productName.allTextContents();
    console.log("The number of products is " + count, "The products are - " + productList);
    
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productToBeAdded) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    
    await cartBtn.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator(`h3:has-text('${productToBeAdded}')`).isVisible();
    expect(bool).toBeTruthy();
    
    await checkoutBtn.click();
    await page.locator(".item__title").first().waitFor();
    const bool2 = await page.locator(`div:has-text('${productToBeAdded}')`).first().isVisible();
    expect(bool2).toBeTruthy();
});
