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

        // Take a screenshot of the current page
        await page.screenshot({ path: "buy" + '.jpg' })

        // Go to the checkout page
        await page.goto(process.env.BASE_URL+"/checkout/register")

        // Take a screenshot of the current page
        await page.screenshot({ path: "checkout" + '.jpg' })

        // Fill in the checkout form
        await page.locator('#personalSalutation').selectOption({ label: "Mr." });
        //await page.getElementById("#salutationId").selectOption({ label: "Mr." })
        await page.locator("#personalFirstName").fill("John")
        await page.locator("#personalLastName").fill("Doe")
        await page.locator('body > main > div > div > div > div > div.checkout-main > div.card.register-card > div > form > div.register-personal > div.custom-control.custom-checkbox.register-guest-control > label').check();
        //await page.getByRole('checkbox', { id: 'guest' }).check();
        //await page.getElementById("#guest").check()
        await page.locator("#personalMail").fill("john.doe@scale.sc")
        await page.locator("#billingAddressAddressStreet").fill("Hermann-Str. 38")
        await page.locator("#billingAddressAddressZipcode").fill("80339")
        await page.locator("#billingAddressAddressCity").fill("Munich")
        await page.locator('#billingAddressAddressCountry').selectOption({ label: "Germany" });

        // Submit the checkout form
        await page.click('body > main > div > div > div > div > div.checkout-main > div.card.register-card > div > form > div.register-submit > button')

        // Wait for the confirmation page to load
        await page.waitForSelector('#confirmFormSubmit');
        await page.screenshot({ path: "confirmation" + '.jpg' })

        // Accept AGBs
        await page.locator('body > main > div > div > div > div > div.checkout-main > div.confirm-tos > div > div > div.custom-control.custom-checkbox > label').check();

        // Submit the confirmation form
        await page.click("#confirmFormSubmit")

        await page.locator('.finish-header').waitFor()
        await page.screenshot({ path: "done" + '.jpg' })
    })

})