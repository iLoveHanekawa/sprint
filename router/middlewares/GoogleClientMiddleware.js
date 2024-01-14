import { config } from "dotenv";
export const GoogleMiddleware = (envPath) => (req, res, next) => {
    try {
        config({ path: envPath });
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
            res.json({
                success: false,
                message: 'Missing configuration: Google Client ID or Google Client Secret missing from { env } file'
            });
        }
        return next();
    }
    catch (error) {
        console.log(error);
    }
};
