export declare class GoogleClient {
    oauthCodeUrl: string;
    scopes: string;
    redirectUrl: string;
    clientId: string | undefined;
    clientSecret: string | undefined;
    tokenUrl: string;
    constructor(googleClientConfig: {
        redirectUrl: string;
    });
    getURLForConsentScreen(): string;
    getCodeExchangeRequestBody(code: string): Promise<unknown>;
}
