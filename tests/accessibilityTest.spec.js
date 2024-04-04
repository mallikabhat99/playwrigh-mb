const { default: AxeBuilder } = require('@axe-core/playwright');
const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');

test('Playwright dev accessibility', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test_key', description: 'XT-506' });
    testInfo.annotations.push({ type: 'test_summary', description: 'Accessibility Validations' });
    testInfo.annotations.push({ type: 'requirements', description: 'XT-507' });
    testInfo.annotations.push({ type: 'test_description', description: 'WCAG AA' });
    await page.goto('https://playwright.dev/');

    await injectAxe(page);

    await checkA11y(page, null, {
        axeOptions: {
            runOnly: {
                type: 'tag',
                values: ['wcag2a'],
            },
            detailedReport: true,
            detailedReportOptions: { html: true }
        },
    })
});

test('Detect Accessibility issues in entire page...', async ({ page }) => {
    await page.goto('https://demo.opencart.com/')
    const scanResutls = await new AxeBuilder({ page }).analyze()
    //Console log the violations
    let violation = scanResutls.violations;
    violation.forEach(function (entry) {
        console.log(
            "Print the Violations:",
            entry.impact + " " + entry.description
        );
    });
    let count = violation.length;
    console.log("List of Violations:", count);
    expect(count).toEqual(5);
});

test('Should  have any automatically detectable WCAG A or AA violations', async ({ page }) => {
    await page.goto('https://demo.opencart.com/');
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa', 'wcag2a'])
        .analyze();
    let violations = await accessibilityScanResults.violations;
    console.log("Total violations..." + violations.length)
    violations.forEach(function (entry) {
        console.log(
            "Print the Violations:",
            entry.impact + " " + entry.description
        )
    })
    expect(violations.length).toEqual(3);
});