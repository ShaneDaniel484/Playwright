const { test, expect } = require('@playwright/test');

test('Place Order', async ({ browser }) => {
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
    const dropdown = page.locator("[placeholder*='Country']");
    const options = page.locator(".ta-results");
    const optionList = options.locator("button");
    const country = " India";
    const orderBtn = page.locator(".actions a");
    const orderConfirmation = page.locator(".hero-primary");
    const orderNo = page.locator(".em-spacer-1 .ng-star-inserted");
    const viewOrderBtn = page.locator("[routerlink='/dashboard/myorders'] i");
    const orderPageTitle = page.locator(".ng-star-inserted h1");
    const orderIDList = page.locator("tbody tr th");
    const viewOrderConfirmation = page.locator(".email-container .email-title");
    const viewPageOrderConfirmation = page.locator(".col-md-6 .col-text");
    const viewOrderBtnViewPage = page.locator("td .btn-primary");

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
    await dropdown.pressSequentially("ind");
    await options.waitFor();
    const optionCount = await optionList.count();
    console.log("options count = "+ optionCount);
    for(let i=0; i < optionCount; ++i)
    {
        if(await optionList.nth(i).textContent() === `${country}`)
        {
            await optionList.nth(i).click();
            break;
        }
    }
    //await page.waitForLoadState('networkidle');
    await orderBtn.click();
    await expect(orderConfirmation).toContainText(" Thankyou for the order. ");
    const orderId = await orderNo.textContent();
    const orderIdClean = orderId.replace(/\|/g, '').replace(/\s+/g, '').trim();
    console.log("Order Number : " + orderIdClean);

    //view order
    await viewOrderBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(orderPageTitle).toHaveText("Your Orders");
    const orderIDListCount = await orderIDList.count();
    // await page.pause();
    for(let i=0; i < orderIDListCount; ++i)
    {
        if(await orderIDList.nth(i).textContent() === orderIdClean)
        {
            await viewOrderBtnViewPage.nth(i).click();
            break;
        }
    }

    await expect(viewOrderConfirmation).toHaveText(" order summary ");
    await expect(viewPageOrderConfirmation).toHaveText(`${orderIdClean}`);

});
