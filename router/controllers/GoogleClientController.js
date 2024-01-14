import { GoogleClient } from "../clients/GoogleClient.js";
import { format } from "url";
export const GoogleClientController = {
    showConsentScreen: () => async (req, res) => {
        try {
            const googleClient = new GoogleClient({ redirectUrl: format({ protocol: req.protocol, host: req.get('host'), pathname: 'sprint/google/code' }) });
            res.redirect(googleClient.getURLForConsentScreen());
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
