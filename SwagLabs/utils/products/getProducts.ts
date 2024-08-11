import { Locator, Page } from "@playwright/test";
import { IProduct } from "../../types";

export async function getProducts(page: Page) {
    const productsListLocator = page.locator('[data-test="inventory-list"]');

    const titleLocators: Locator[] = await productsListLocator
        .locator('[data-test="inventory-item-name"]')
        .all();

    const priceLocators: Locator[] = await productsListLocator
        .locator('[data-test="inventory-item-price"]')
        .all();

    const products: IProduct[] = [];
    for (let i = 0; i < titleLocators.length; i++) {
        const title: string = await titleLocators[i].innerText();

        const stringPrice: string = await priceLocators[i].innerText();
        const price: number = +stringPrice.slice(1);

        products.push({
            title,
            price,
        });
    }

    return products;
}
