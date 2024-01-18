# Sprint

Sprint is a Node.js package designed to simplify the process of sending emails in your applications. It provides support for both traditional SMTP servers and Google's 3-legged authentication flow. With Sprint, you can easily configure and test mailing using the Sprint dashboard.

## Installation

To install Sprint, run the following command:

```bash
npm install @ilovehanekawa/sprint
```

## Usage

1. Import the Sprint router in your Express application at the '/sprint' endpoint:

```javascript
import express from 'express';
import { getSprintRouter } from '@ilovehanekawa/sprint';
import { ...yourConfig } from './yourConfigFile.js';

const app = express();

app.use('/sprint', getSprintRouter({...yourConfig}));

// Add other routes and middleware as needed

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
2. Configure the router by navigating to the router's root.

3. Import the useSprintMailer hook from '@lovehanekawa/sprint/client'

## Using `useSprintMailer` Hook

Assuming you have already installed the `@ilovehanekawa/sprint` package in your React project, here's a simple example of how to use the `useSprintMailer` hook in a React component.

### Example

```jsx
import React, { useState } from 'react';
import { useSprintMailer } from '@ilovehanekawa/sprint';

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
