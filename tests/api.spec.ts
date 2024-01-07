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
});