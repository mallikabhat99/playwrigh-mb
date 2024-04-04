import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly signIn: Locator;

    constructor(public readonly page: Page) {
        this.username = this.page.getByLabel('Username');
        this.password = this.page.getByLabel('Password');
        this.signIn = this.page.getByRole('button', { name: 'Sign in' });
    }

    async goto() {
        await this.page.goto("https://learn-bronte-qaint.pearson.com/9aa31d90-cca7-11ee-9072-5332ebedc339/a23856b0-cca7-11ee-9072-5332ebedc339");

    }
    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signIn.click();
    }
}