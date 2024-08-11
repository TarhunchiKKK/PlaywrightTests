import { Page, Locator, expect } from '@playwright/test';
import { PASSWORD, USERNAMES } from '../constants';
import { ProductsSortCompareer } from '../types';
import { getProducts } from '../utils';
import { LoginPage } from './login';

export class ProductsPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async goto() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.login(USERNAMES.STANDARD_USER, PASSWORD);
    }

    async expectPageUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async sort(sortOption: string) {
        await this.sortDropdown.selectOption(sortOption);
    }

    async expectSortOrder(sortCompareer: ProductsSortCompareer) {
        const products = await getProducts(this.page);

        for (let i = 0; i < products.length - 1; i++) {
            expect(sortCompareer(products[i], products[i + 1])).toEqual(1);
        }
    }

    async gotoShoppingCart() {
        await this.shoppingCartLink.click();
    }

    async addProductToCart() {
        await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
    }

    async removeProductFromCart() {
        await this.page.getByRole('button', { name: 'Remove' }).first().click();
    }

    async removeAllProductsFromCart() {
        const buttonLocators = await this.page.getByRole('button', { name: 'Remove' }).all();

        for (let buttonLocator of buttonLocators) {
            await buttonLocator.click();
        }
    }

    async checkCartProductsCount(count: number) {
        const cartBadgeLocator = '[data-test="shopping-cart-badge"]';

        if (count === 0) {
            await expect(this.page.locator(cartBadgeLocator)).not.toBeVisible();
        } else {
            await expect(this.page.locator(cartBadgeLocator)).toHaveText(String(count));
        }
    }
}
