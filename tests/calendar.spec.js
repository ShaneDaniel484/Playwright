const{test,expect} = require("@playwright/test");

test("Calendar operations",async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const month = "3";
    const day = "11";
    const year = "2030";
    const expectedList = [month,day,year];

    page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    

    //new window
    const [page2] =  await Promise.all(
        [
            context.waitForEvent("page"),
            await page.getByRole("link",{name: "Top Deals"}).click(),
    ])
    await page2.locator(".react-date-picker__inputGroup").nth(0).click();
    await page2.locator(".react-calendar__navigation__label").click();
    await page2.locator(".react-calendar__navigation__label").click();
    await page2.getByText(year).last().click();
    await page2.locator(".react-calendar__year-view__months__month").nth(month-1).click();
    //await page2.getByText(month).click();
    await page2.locator("//abbr[text()='"+day+"']").last().click();

    //assertions
    const inputs =  page2.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
})