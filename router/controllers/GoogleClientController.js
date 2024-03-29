import { CreateGoogleClient } from "../clients/GoogleClient.js";
import { format } from "url";
export const GoogleClientController = {
    showConsentScreen: ({ getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }) => async (req, res) => {
        try {
            const googleClient = CreateGoogleClient({
                getGoogleAccessToken,
                getGoogleRefreshToken,
                storeGoogleAccessToken,
                storeGoogleRefreshToken
            });
            res.redirect(googleClient.getURLForConsentScreen(format({ protocol: req.protocol, host: req.get('host'), pathname: 'sprint/google/code' })));
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error
            });
        }
    },
    getTokens: ({ getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }) => async (req, res) => {
        try {
            const googleClient = CreateGoogleClient({
                getGoogleAccessToken,
                storeGoogleAccessToken,
                storeGoogleRefreshToken,
                getGoogleRefreshToken
            });
            const { code } = req.query;
            if (!code) {
                res.status(400).json({
                    success: false,
                    error: 'Missing parameter'
                });
            }
            res.json(await googleClient.exchangeCode(code, format({ protocol: req.protocol, host: req.get('host'), pathname: 'sprint/google/code' })));
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error
            });
        }
    }
};
