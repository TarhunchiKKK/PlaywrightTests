import { test } from '@playwright/test';
import { CartPage } from '../pages';

let cartPage: CartPage;

test.describe('Cart page tests', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        cartPage = new CartPage(page);
    });

    test.beforeEach(async () => {
        await cartPage.goto();
    });

    test('Check cart page url', async () => {
        await cartPage.checkPageUrl();
    });

    test('Check redirecting to products page', async () => {
        await cartPage.checkRedirectingToProductsPage();
    });

    test('Check removing products from cart', async () => {
        const productsCount = 3;
        await cartPage.goto(productsCount);

        await cartPage.checkProductsCount(productsCount);

        for (let i = productsCount; i > 0; i--) {
            await cartPage.removeProductFormCart();
            await cartPage.checkProductsCount(i - 1);
        }
    });
});
