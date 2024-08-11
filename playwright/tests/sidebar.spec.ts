import { test } from '@playwright/test';
import { SidebarObjectmodel } from '../pages';

let sidebar: SidebarObjectmodel;

test.describe('Testing sidebar behaviour', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        sidebar = new SidebarObjectmodel(page);
    });

    test.beforeEach(async () => {
        await sidebar.goto();
    });

    test('Test sidebar opening-closing', async () => {
        await sidebar.openSidebar();
        await sidebar.closeSidebar();
    });

    test('Testing redirecting on about page', async () => {
        await sidebar.openSidebar();
        await sidebar.checkRedirectOnAboutPage();
    });

    test('Testing logout', async () => {
        await sidebar.openSidebar();
        await sidebar.checkLogout();
    });
});
