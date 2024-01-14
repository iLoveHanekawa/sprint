import { test, expect } from '@playwright/test';
import { MailResponseType } from '../routers/controllers/MailController';

test("Mail is sent successfully", async () => {
    const res = await fetch("http://localhost:3000/sprint/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data: MailResponseType = await res.json();
    expect(data).toHaveProperty('status', true);
    expect(data).toHaveProperty('message', 'Email sent successfully');
    expect(data.mailer).toHaveProperty('rejected', []);
});
