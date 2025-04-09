const { test, expect, request } = require('@playwright/test');

const LoginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const OrderPayLoad = {orders: [{country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let token;
let OrderId;


test.beforeAll(async () => {

    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: LoginPayload
        })
    //expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    expect(loginResponseJson.message).toContain("Login Successfully");
    token = loginResponseJson.token;
    console.log("Token----->" + token);

    //Order API
    const orderApiResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: OrderPayLoad,
            headers:{
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })

        OrderId = await orderApiResponse.json();
        console.log("OrderID --> " + OrderId.orders[0])
});



test('Client App login', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})