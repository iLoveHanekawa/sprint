import { test, expect } from '@playwright/test'
import dotenv, { DotenvParseOutput } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';
import { SprintGetEnvResponse, SprintVariables } from '../router';

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const basePath = resolve(dirname(currentModulePath), '../test-app/.env');
dotenv.config({ path: basePath });

test.describe('REST routes', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    // test('Sprint router is working', async ({ request }) => {
    //     const res = await request.get('http://localhost:3000/sprint');
    //     expect(res.ok()).toBeTruthy();
    //     expect(await res.json()).toMatchObject({
    //         sprint: "Sprint router is working."
    //     });
    // });

    test('Sprint \'getEnv\' request is working', async ({ request }) => {
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
            'SMTP_FROM_NAME',
            'SMTP_TEST_RECIPIENT_EMAIL',
            'SMTP_TEST_CONTENT',
            'SMTP_TEST_SUBJECT'
        ];
        envKeyArr.forEach((value: string, index: number) => {
            expect(data.variables).toHaveProperty(value);
        });
        expect(data).toHaveProperty('envPath');
        expect(typeof data.envPath).toBe('string');
    });

    test('Sprint \'post-env\' request is working', async ({ request }) => {
        let initialVariables: null | DotenvParseOutput = null;
        const fileContent = await fs.readFile(basePath, { encoding: 'utf8', flag: 'r' });
            expect(fileContent).toBeDefined();
            initialVariables = dotenv.parse<SprintVariables>(fileContent);
            expect(initialVariables).toBeTruthy();
        let body = { TEST_A: '123' };
        if(process.env.TEST_A && (process.env.TEST_A as string).length === 3) {
            body = { TEST_A: '1234'};
        }
        const res = await request.post("http://localhost:3000/sprint/post-env", {
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data: SprintGetEnvResponse = await res.json();
        expect(data).toHaveProperty('status', true);
        expect(data).toHaveProperty('variables');
        const finalVariables = data.variables;
        Object.keys(finalVariables!).forEach((value, index) => {
            if(value !== 'TEST_A') {
                expect(initialVariables![value]).toEqual(finalVariables![value]);
            }
            else {
                expect(body.TEST_A).toEqual(finalVariables![value]);
            }
        });
    });
});
