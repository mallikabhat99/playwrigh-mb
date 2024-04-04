import type { Page, Locator } from '@playwright/test';

export class DashboardPage {
    private readonly restartIcon: Locator;
    private readonly confirmRestart: Locator;

    constructor(public readonly page: Page) {
        this.restartIcon = this.page.frameLocator('iframe[title="Photosynthesis"]').getByLabel('Restart');
        this.confirmRestart = this.page.frameLocator('iframe[title="Photosynthesis"]').getByText('Restart', { exact: true })
    }
    async restartLesson() {
        await this.restartIcon.click();
        await this.confirmRestart.click();
    }
}