import type { Page, Locator, FrameLocator } from '@playwright/test';

export class PhotosynthesisPage {
    private readonly startButton: Locator;
    private readonly increaseChamber2: Locator;
    private readonly labLesson: FrameLocator;
    private readonly sim: FrameLocator;

    constructor(public readonly page: Page) {
        this.startButton = this.page.frameLocator('iframe[title="Photosynthesis"]')
            .getByLabel('Photosynthesis Sim Start');
        this.labLesson = this.page.frameLocator('iframe[title="Photosynthesis"]').frameLocator('iframe[title="Photosynthesis Sim"]');
        this.sim = this.labLesson.frameLocator('iframe[title="Lesson SIM"]');
        this.increaseChamber2 = this.sim.getByLabel('Increase chamber 2 intensity');

    }
    async startPhotoSynthesisLab() {
        await this.startButton.click();
    }
    async increaseChamber2LightIntensity() {
        await this.increaseChamber2?.click({ clickCount: 2 });
    }
}