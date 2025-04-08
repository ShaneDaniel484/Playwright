const {test,expect} = require("@playwright/test");

test("popup", async({page})=>{


    const hideBtn = page.locator("#displayed-text");
    const confirmBtn = page.locator("#confirmbtn");
    const hoverBtn = page.getByRole("button",{name: "Mouse Hover"});

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await expect(hideBtn).toBeVisible();
    // await page.locator("#hide-textbox").click();
    // await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
    // await confirmBtn.click();
    // page.on('dialog',dialog => dialog.accept());
    // await hoverBtn.hover();

    //iframe Handling
    const framePage = page.frameLocator("#courses-iframe");
    const accessLink = framePage.getByRole("link",{name: "All Access Plan"});
    await accessLink.click();
    const subCount = await framePage.locator(".text h2").textContent();
    console.log("Subscriber count --------->" + subCount.split(" ")[1]);

    //switching to Nitro
})