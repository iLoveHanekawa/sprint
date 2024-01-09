import { test, expect } from '@playwright/test'

test.describe('REST routes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });
    test('Sprint router is working', async ({ request }) => {
        const res = await request.get('http://localhost:3000/sprint');
        expect(res.ok()).toBeTruthy();
        expect(await res.json()).toMatchObject({
            sprint: "Sprint router is working."
        });
    });
    test('Sprint \'getEnv\' function is working', async ({ request }) => {
        const res = await request.get('http://localhost:3000/sprint/get-env');
        expect(res.ok()).toBeTruthy();
        const data = await res.json();
        expect(data).toHaveProperty("status", true);
        expect(data).toHaveProperty("variables");
        expect(typeof data.variables).toBe('object');
        const envKeyArr: string[] = [
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'SMTP_HOST',
            'SMTP_FROM_EMAIL',
            'SMTP_USERNAME',
            'SMTP_PASSWORD',
            'SMTP_PORT',
            'SMTP_CONTENT_TYPE',
            'SMTP_ENCRYPTION',
            'SMTP_CHARSET',
            'SMTP_DEBUG',
        ];
        envKeyArr.forEach((value: string, index: number) => {
            expect(data.variables).toHaveProperty(value);
        });
        expect(data).toHaveProperty('envPath')
        expect(typeof data.envPath).toBe('string');
    })
});