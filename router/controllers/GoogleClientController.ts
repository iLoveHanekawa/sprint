import type { Request, Response } from "express";
import { GoogleClient } from "../clients/GoogleClient.js";
import { format, parse } from "url";
import { request } from "http";

export const GoogleClientController = {
    showConsentScreen: async (req: Request, res: Response) => {
        try {
            const googleClient = new GoogleClient({ redirectUrl: format({ protocol: req.protocol, host: req.get('host'), pathname: 'sprint/google/code'})});
            res.redirect(googleClient.getURLForConsentScreen());
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error
            });
        }
    },
    getTokens: async (req: Request, res: Response) => {
        try {
            const googleClient = new GoogleClient({ redirectUrl: format({ protocol: req.protocol, host: req.get('host'), pathname: 'sprint/google/code' })});
            const { code } = req.query;
            if(!code) {
                res.status(400).json({
                    success: false,
                    error: 'Missing parameter'
                })
            }
            res.json(await googleClient.getCodeExchangeRequestBody(code as string));
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error
            });
        }
    }
}