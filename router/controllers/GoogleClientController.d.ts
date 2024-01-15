import type { Request, Response } from "express";
import type { SprintRouterGoogleClientConfig } from "../index.js";
export declare const GoogleClientController: {
    showConsentScreen: ({ getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }: SprintRouterGoogleClientConfig) => (req: Request, res: Response) => Promise<void>;
    getTokens: ({ getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }: SprintRouterGoogleClientConfig) => (req: Request, res: Response) => Promise<void>;
};
