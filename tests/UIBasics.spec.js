const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test('Browser', async ({page})=>
{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    //elements
    const UserName = page.locator("#username");
    const Password = page.locator("[id='password']");
    const CheckBox = page.locator("[type='checkbox']");
    const SignInBtn = page.locator("#signInBtn");
    const CardTitles = page.locator(".card-body a");

    //actions
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await UserName.fill("rahulshettyacademy");
    //await page.locator("#username").fill("rahulsmy");
    await Password.fill("learning");
    await CheckBox.click();
    await SignInBtn.click();
    //success condition
    await expect(page).toHaveTitle("ProtoCommerce");
    //fail condition
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    //toPrint
    // console.log(await CardTitles.nth(0).textContent());
    // console.log(await CardTitles.first.textContent());
    //to print all - this will be flaky since playwright does not have wait for this
    //to over come we can use wait until network idle\
    await page.waitForLoadState('networkidle');
    //or we can use
    //await CardTitles.waitFor(); //- only when single elements so we can use
    // await CardTitles.first().waitFor();
    console.log(await CardTitles.allTextContents());

});

test('UI Controls', async ({page})=>
    {
        //elements
        const UserName = page.locator("#username");
        const Password = page.locator("[id='password']");
        const CheckBox = page.locator("[type='checkbox']");
        const SignInBtn = page.locator("#signInBtn");
        const DropDown = page.locator("select.form-control");
        const RadioBtn = page.locator(".checkmark");
        const PopUp = page.locator("#okayBtn");
        const CardTitles = page.locator(".card-body a");
        const BlinkingTxt = page.locator(".blinkingText");

        //actions
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await UserName.fill("rahulshettyacademy");
        await Password.fill("learning");
        await DropDown.selectOption("consult");
        //await page.pause(); //To debug
        await RadioBtn.last().click();
        expect (RadioBtn.last()).toBeChecked(); //assertion
        await PopUp.click();
        await CheckBox.click();
        expect (CheckBox).toBeChecked();
        //MARCH 16
        //attribute assertion
        await expect(BlinkingTxt).toHaveAttribute("Class","blinkingText");
        await BlinkingTxt.click();
        

        // await SignInBtn.click();
        // await expect(page).toHaveTitle("ProtoCommerce");
        // console.log(await CardTitles.allTextContents());
        
        
    });


    test.only("Child Windows Handling",async ({browser})=>
    {   
        const context = await browser.newContext();
        const page = await context.newPage();
        //elements
        const BlinkingTxt = page.locator(".blinkingText");
        //const UserName = page.locator("#username");

        //actions
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        
        //page opening action should be executed parallel with listener
        const [newPage] = await Promise.all(
            [
                context.waitForEvent("page"),
                BlinkingTxt.click(),
        ]);

        const text = await newPage.locator(".red").first().textContent();
        const arrayTxt = text.split("@");
        const domain = arrayTxt[1].split(" ");
        const userId = domain[0].split(".");
        //console.log(userId[0]);
        await page.locator("#username").fill(userId[0]);
        console.log(await page.locator("#username").textContent());      
        
    });
