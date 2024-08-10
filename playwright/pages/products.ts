import { Page, Locator, expect } from "@playwright/test";
import { PASSWORD, URLS, USERNAMES } from "../constants";
import { ProductsSortCompareer } from "../types";
import { getProducts } from "../utils";
import { LoginPage } from "./login";

export class ProductsPage {
    readonly page: Page;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );
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

        console.log(products);

        for (let i = 0; i < products.length - 1; i++) {
            expect(sortCompareer(products[i], products[i + 1])).toEqual(1);
        }
    }
}
