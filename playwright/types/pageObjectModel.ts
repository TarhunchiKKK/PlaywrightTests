import { Page } from "@playwright/test";

export interface IPageObjectModel {
    goto(): Promise<void>;

    close(): Promise<void>;

    expectPageTitle(title: string): Promise<void>;
}
