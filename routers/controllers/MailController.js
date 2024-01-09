import { createTransport } from 'nodemailer';
export const MailController = {
    send: async (req, res) => {
        try {
            const transport = createTransport({
                host: "smtp.sendgrid.net",
                secure: false,
                port: 587,
                auth: {
                    user: 'apikey',
                    pass: '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'
                },
                tls: {
                    rejectUnauthorized: false,
                },
                debug: true
            });
            const response = await transport.sendMail({
                from: "abhishek@29kreativ.com",
                to: "arjunthakur900@gmail.com",
                subject: "Nodemailer test",
                text: "Hello from sprint"
            });
            return res.json({
                status: true,
                message: 'Email sent successfully',
                mailer: response
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                status: false,
                error: 'Failed to send email',
            });
        }
    }
};
