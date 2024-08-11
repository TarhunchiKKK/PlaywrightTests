import { Page, Locator, expect } from '@playwright/test';
import { ProductsPage } from './products';
import { URLS } from '../constants';

export class CartPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async goto(productsCount: number = 0) {
        const productsPage = new ProductsPage(this.page);
        await productsPage.goto();

        // add some products to cart
        await productsPage.removeAllProductsFromCart();
        for (let i = 0; i < productsCount; i++) {
            await productsPage.addProductToCart();
        }
        await this.shoppingCartLink.click();
    }

    async checkPageUrl() {
        await expect(this.page).toHaveURL(URLS.CART);
    }

    async removeProductFormCart() {
        await this.page.getByRole('button', { name: 'Remove' }).first().click();
    }

    async checkProductsCount(productsCount: number) {
        const productsLocators = await this.page.locator('[data-test="inventory-item"]').all();
        expect(productsLocators.length).toEqual(productsCount);
    }

    async checkRedirectingToProductsPage() {
        await this.continueShoppingButton.click();
        await expect(this.page).toHaveURL(URLS.PRODUCTS);
    }
}
