import { expect, Locator, Page } from "@playwright/test";
import { URLS } from "../constants";
import { IPageObjectModel } from "../types";

const usernameErrorMessage = "Epic sadface: Username is required";
const passwordErrorMessage = "Epic sadface: Password is required";

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly errorField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorField = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto(URLS.LOGIN);
    }

    async close() {
        await this.page.close();
    }

    async expectPageTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async login(username: string, password: string) {
        await this.usernameField.click();
        await this.usernameField.fill(username);

        await this.passwordField.click();
        await this.passwordField.fill(password);

        await this.loginButton.click();
    }

    async expectUsernameRequeiredError() {
        await expect(this.errorField).toHaveText(usernameErrorMessage);
    }

    async expectPasswordRequeiredError() {
        await expect(this.errorField).toHaveText(passwordErrorMessage);
    }

    async expectSuccessLogin() {
        await expect(this.page).toHaveURL(URLS.PRODUCTS);
    }
}
