import type { GoogleClientConfig } from '../controllers/GoogleClientController.js';
interface ExchangeCodeResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: "Bearer";
}
declare class GoogleClient {
    oauthCodeUrl: string;
    scopes: string;
    clientId: string | undefined;
    clientSecret: string | undefined;
    tokenUrl: string;
    googleClientConfig: GoogleClientConfig;
    constructor(googleClientConfig: GoogleClientConfig);
    getURLForConsentScreen(): string;
    exchangeCode(code: string): Promise<ExchangeCodeResponse | {
        success: boolean;
        message: string;
    }>;
    private accessTokenExpired;
    private exchangeRefreshToken;
    getAccessToken(): Promise<string | undefined>;
}
export declare function CreateGoogleClient(googleClientConfig: GoogleClientConfig): GoogleClient;
export {};
