import { test } from "@playwright/test";
import { LoginPage } from "../pages";
import { TITLE, USERNAMES, PASSWORD } from "../constants";

let loginPage: LoginPage;

test.describe("Login page tests", () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new LoginPage(page);
    });

    test("Check page title", async () => {
        await loginPage.goto();
        await loginPage.expectPageTitle(TITLE);
    });

    test("Success login", async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(USERNAMES.STANDARD_USER, PASSWORD);
        await loginPage.expectSuccessLogin();
    });

    test("Missing username", async () => {
        await loginPage.goto();
        await loginPage.login("", PASSWORD);
        await loginPage.expectUsernameRequeiredError();
    });

    test("Missing password", async () => {
        await loginPage.goto();
        await loginPage.login(USERNAMES.STANDARD_USER, "");
        await loginPage.expectPasswordRequeiredError();
    });
});
