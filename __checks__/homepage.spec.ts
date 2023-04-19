import { test } from "@playwright/test"
const { chromium } = require("playwright")
const { withTidewaysHeaders } = require("./snippets/tideways.js")

test.describe("Random Shop Category Checkout Test", () => {
    let browser
    let context
    let page

    test.beforeAll(async () => {
        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()
        await withTidewaysHeaders(page);
    })

    test.afterAll(async () => {
        await browser.close()
    })

    test("should checkout a random product from a random shop category", async () => {
        // Go to the homepage
        await page.goto(process.env.BASE_URL)

        // Get a list of all shop category links on the homepage
        const categoryLinks = await page.$$eval("a.nav-link", as => as.map(a => a.href))

        // Pick a random category link
        const randomCategoryLink =
            categoryLinks[Math.floor(Math.random() * categoryLinks.length)]

        // Go to the random category page
        await page.goto(randomCategoryLink)

        // Take a screenshot of the current page
        await page.screenshot({ path: "randomCategoryLink"+'.jpg' })

        // Get a list of all product links on the category page
        const productLinks = await page.$$eval(".product-action a", as => as.map(a => a.href))

        // Pick a random product link
        const randomProductLink =
            productLinks[Math.floor(Math.random() * productLinks.length)]

        console.log("FS_TEST: " + randomProductLink)

        // Go to the random product page
        await page.goto(randomProductLink)

        // Take a screenshot of the current page
        await page.screenshot({ path: "randomProductLink" + '.jpg' })

        // Add the product to the cart
        await page.click("button.btn-buy")

        // Go to the checkout page
        await page.goto(process.env.BASE_URL+"/checkout/register")

        // Take a screenshot of the current page
        await page.screenshot({ path: "checkout" + '.jpg' })

        // Fill in the checkout form
        await page.getElementById("#salutationId").selectOption({ label: "Mr." })
        await page.fill("#firstName", "John")
        await page.fill("#lastName", "Doe")
        await page.getElementById("#guest").check()
        await page.fill("#email", "john.doe@scale.sc")
        await page.fill("#billingAddress[street]", "Hermann-Str. 38")
        await page.fill("#billingAddress[zipcode]", "81369")
        await page.fill("#billingAddress[city]", "Munich")

        // Submit the checkout form
        await page.click('input[type="submit"]')

        // Verify that the checkout was successful
        //await page.waitForSelector('.checkout-success');
    })
})