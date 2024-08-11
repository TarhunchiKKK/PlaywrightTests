import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from './login';
import { PASSWORD, URLS, USERNAMES } from '../constants';

export class SidebarObjectmodel {
    readonly page: Page;
    readonly sidebar: Locator;
    readonly openSidebarButton: Locator;
    readonly closeSidebarButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = this.page.locator('[class="bm-menu-wrap"]');
        this.openSidebarButton = this.page.getByRole('button', { name: 'Open Menu' });
        this.closeSidebarButton = this.page.getByRole('button', { name: 'Close Menu' });
    }

    async goto() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.login(USERNAMES.STANDARD_USER, PASSWORD);
    }

    async openSidebar() {
        await this.openSidebarButton.click();
        await expect(this.sidebar).toBeVisible();
    }

    async closeSidebar() {
        await this.closeSidebarButton.click();
        await this.page.waitForTimeout(1000);
        await expect(this.sidebar).not.toBeVisible();
    }

    async checkRedirectOnAboutPage() {
        await this.page.getByRole('link', { name: 'About' }).click();
        await expect(this.page).toHaveURL(URLS.ABOUT);
    }

    async checkLogout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
        await expect(this.page).toHaveURL(URLS.LOGIN);
    }
}
