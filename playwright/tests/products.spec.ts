import { test } from '@playwright/test';
import { ProductsPage } from '../pages';
import { PRODUCTS_SORT_COMPAREERS, PRODUCTS_SORT_ORDERS, URLS } from '../constants';

let productsPage: ProductsPage;

test.describe('Products page tests', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        productsPage = new ProductsPage(page);
    });

    test.beforeEach(async () => {
        await productsPage.goto();
    });

    test('Check redirecting after login', async () => {
        await productsPage.expectPageUrl(URLS.PRODUCTS);
    });

    test('Check sorting by name ascending', async () => {
        await productsPage.sort(PRODUCTS_SORT_ORDERS.NAME_ASC);
        await productsPage.expectSortOrder(PRODUCTS_SORT_COMPAREERS.NAME_ASC);
    });

    test('Check  sorting by name descending', async () => {
        await productsPage.sort(PRODUCTS_SORT_ORDERS.NAME_DESC);
        await productsPage.expectSortOrder(PRODUCTS_SORT_COMPAREERS.NAME_DESC);
    });

    test('CHeck sorting by price ascending', async () => {
        await productsPage.sort(PRODUCTS_SORT_ORDERS.PRICE_ASC);
        await productsPage.expectSortOrder(PRODUCTS_SORT_COMPAREERS.PRICE_ASC);
    });

    test('Check sorting by price descending', async () => {
        await productsPage.sort(PRODUCTS_SORT_ORDERS.PRICE_DESC);
        await productsPage.expectSortOrder(PRODUCTS_SORT_COMPAREERS.PRICE_DESC);
    });

    test.only('Check adding products to cart', async ({ page }) => {
        await productsPage.removeAllProductsFromCart();

        let counter = 1;

        while (counter <= 3) {
            await productsPage.addProductToCart();
            await productsPage.checkCartProductsCount(counter);
            counter++;
        }

        counter--;

        while (counter > 0) {
            await productsPage.removeProductFromCart();
            counter--;
            await productsPage.checkCartProductsCount(counter);
        }
    });
});
