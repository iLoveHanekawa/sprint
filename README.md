# Sprint

Sprint is a Node.js package designed to simplify the process of sending emails in your applications. It provides support for both traditional SMTP servers and Google's 3-legged authentication flow. With Sprint, you can easily configure and test mailing using the Sprint dashboard.

## Installation

To install Sprint, run the following command:

```bash
npm install @ilovehanekawa/sprint
```

## Usage

1. Import the Sprint router in your Express application at the '/sprint' endpoint:

```typescript
import express, { Request, Response } from 'express';
import { getSprintRouter } from '@ilovehanekawa/sprint/router/index.js';
import { dirname, resolve } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { connectDB } from './database/connect.js';
const app = express();
import { GoogleTokensModel } from './models/GoogleTokens.js';

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const basePath = resolve(dirname(currentModulePath), './.env');

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    return res.json({
        hello: "arjun"
    });
});

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173']
}));

app.use('/sprint', getSprintRouter({
    envPath: basePath,
    permissionCallback: () => true,
    storeGoogleAccessToken: async (accessToken: string, expiresIn: number) => {
        await GoogleTokensModel.findOneAndUpdate({
            token_type: 'access_token',
        }, { expires_in: Date.now() + (expiresIn * 1000), token_value: accessToken }, { upsert: true }).exec();
    },
    getGoogleAccessToken: async () => {
        const accessToken = await GoogleTokensModel.findOne({
            token_type: 'access_token'
        }).exec();
        return { accessToken: accessToken?.token_value as string, expiresIn: accessToken?.expires_in as number };
    },
    getGoogleRefreshToken: async () => {
        const refreshToken = await GoogleTokensModel.findOne({
            token_type: 'refresh_token'
        }).exec();
        return { refreshToken: refreshToken?.token_value as string };
    },
    storeGoogleRefreshToken: async (refreshToken: string) => {
        await GoogleTokensModel.findOneAndUpdate({
            token_type: 'refresh_token'
        }, { token_value: refreshToken }, { upsert: true }).exec();
    }
}));

app.listen(3000, async () => {
    try {
        await connectDB();
        console.log('server live at http://localhost:3000');
    } catch (error) {
        console.log(error);        
    }
});
```
2. Configure the router by navigating to the router's root.

3. Import the useSprintMailer hook from '@lovehanekawa/sprint/client'

## Using `useSprintMailer` Hook

Assuming you have already installed the `@ilovehanekawa/sprint` package in your React project, here's a simple example of how to use the `useSprintMailer` hook in a React component.

### Example

```jsx
import React, { useState } from 'react';
import { useSprintMailer } from '@ilovehanekawa/sprint/client';

const EmailSender = () => {
    // Destructuring the useSprintMailer hook for concise syntax
    const { loading, sendMail } = useSprintMailer('http://localhost:3000/sprint');

    // State to manage email content
    const [emailContent, setEmailContent] = useState({
        to: 'recipient@example.com',
        subject: 'Test Email',
        body: 'This is a test email sent using Sprint!',
    });

    // Handler function to send the test email
    const handleSendMail = async () => {
        try {
            // Send the email using the sendMail function from the hook
            const response = await sendMail({
                to: emailContent.to,
                subject: emailContent.subject,
                body: emailContent.body,
            });

            // Log the response from the Sprint mailer API
            console.log(response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div>
            <h2>Email Sender</h2>
            <label>
                To:
                <input
                    type="email"
                    value={emailContent.to}
                    onChange={(e) => setEmailContent({ ...emailContent, to: e.target.value })}
                />
            </label>
            <label>
                Subject:
                <input
                    type="text"
                    value={emailContent.subject}
                    onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                />
            </label>
            <label>
                Body:
                <textarea
                    value={emailContent.body}
                    onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
                />
            </label>
            <button onClick={handleSendMail} disabled={loading}>
                Send Test Email
            </button>
            {loading && <p>Sending...</p>}
        </div>
    );
};

export default EmailSender;
```
