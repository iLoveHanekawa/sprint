import type { SprintRouterGoogleClientConfig } from '../index.js';
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
    googleClientConfig: SprintRouterGoogleClientConfig;
    constructor(googleClientConfig: SprintRouterGoogleClientConfig);
    getURLForConsentScreen(redirectUrl: string): string;
    exchangeCode(code: string, redirectUrl: string): Promise<ExchangeCodeResponse | {
        success: boolean;
        message: string;
    }>;
    private accessTokenExpired;
    private exchangeRefreshToken;
    getAccessToken(): Promise<string | undefined>;
}
export declare function CreateGoogleClient(googleClientConfig: SprintRouterGoogleClientConfig): GoogleClient;
export {};
