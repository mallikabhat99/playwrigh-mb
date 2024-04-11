import { expect, test } from "../page-objects/my-test";
import { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const username = 'itptest03';
const password = 'Password1';

//Requirement : Need to run test in sequential mode and capture accessiblity results of each page
test.describe.configure({ mode: 'serial' });
let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test.describe("Verify the Accessibility scanning ", () => {
    test("Login & Restart Lesson", async ({
        loginPage,
        dashboardPage,
        page
    }) => {
        await test.step("Verify The Accessibility Testing in Dashboard page.", async () => {
            await test.step("Navigate to the learnspace url and login.", async () => { });
            await loginPage.goto();
            await loginPage.login(username, password);
            await test.step("Restart dashboard lesson", async () => { });
            await dashboardPage.restartLesson();
            await test.step("Accessibility scan in the Dashboard home Page.", async () => { });
            const accessibilityScanResults = await new AxeBuilder({ page })
                .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
                .analyze();
            let violations = accessibilityScanResults.violations;
            console.log("Total violations : " + violations.length);
            //expect(accessibilityScanResults.violations).toEqual([0]);
        });
    });

    test("Start Photosynthesis Sim & Set Light internsity", async ({
        photosynthesisPage,
        page
    }) => {
        await test.step("Verify Start Sim & Set Light internsity.", async () => {
            await test.step("Start the sim.", async () => { });
            await photosynthesisPage.startPhotoSynthesisLab();
            await test.step("Increase light intensity", async () => { });
            await photosynthesisPage.increaseChamber2LightIntensity();
            await test.step("Accessibility scan in the Landing Page.", async () => { });
            const accessibilityScanResults = await new AxeBuilder({ page })
                .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
                .analyze();
            let violations = accessibilityScanResults.violations;
            console.log("Total violations : " + violations.length);
            //expect(accessibilityScanResults.violations).toEqual([0]);
        });
    });
});
