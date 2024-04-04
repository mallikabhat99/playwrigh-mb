import { test as base } from '@playwright/test';
import { LoginPage } from './login-page';
import { DashboardPage } from './dashboard-page';
import { PhotosynthesisPage } from './photosynthesis-page';

// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    photosynthesisPage: PhotosynthesisPage;
};

// Extend base test by providing fixture pages
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    photosynthesisPage: async ({ page }, use) => {
        await use(new PhotosynthesisPage(page));
    },
});
export { expect } from '@playwright/test';