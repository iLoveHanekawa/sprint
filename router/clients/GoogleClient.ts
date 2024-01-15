import { URLSearchParams } from 'url';
import fetch from 'node-fetch'
import type { GoogleClientConfig } from '../controllers/GoogleClientController.js';

interface GoogleExchangeRequest {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
}

interface GoogleRefreshTokenResponse {
    access_token: string
    expires_in: number
}

interface GoogleCodeExchangeRequest extends GoogleExchangeRequest {
    code: string;
    grant_type: 'authorization_code';
}

type OAuthCodeRequestPayload = {
    scope: string;
    access_type: string;
    include_granted_scopes: 'true' | 'false';
    response_type: 'code';
    state: 'state_parameter_passthrough_value';
    redirect_uri: string;
    client_id: string;
    prompt: 'consent';
}

interface GoogleRefreshTokenExchangeRequest extends GoogleExchangeRequest {
    refresh_token: string
    grant_type: 'refresh_token'
}

interface ExchangeCodeResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: "Bearer";
}

class GoogleClient {
    oauthCodeUrl: string;
    scopes: string;
    clientId: string | undefined;
    clientSecret: string | undefined;
    tokenUrl: string;
    googleClientConfig: GoogleClientConfig
    //TODO state
    constructor(googleClientConfig: GoogleClientConfig) {
        this.oauthCodeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        this.scopes = 'https://mail.google.com/';
        this.clientId = process.env.GOOGLE_CLIENT_ID;
        this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        this.tokenUrl = 'https://oauth2.googleapis.com/token';
        this.googleClientConfig = googleClientConfig;
    }

    public getURLForConsentScreen(): string {
        return this.oauthCodeUrl + '?' + (new URLSearchParams(({
            scope: this.scopes,
            access_type: 'offline',
            include_granted_scopes: 'true',
            client_id: this.clientId,
            prompt: 'consent',
            redirect_uri: this.googleClientConfig.redirectUrl,
            response_type: 'code',
            state: 'state_parameter_passthrough_value'
        } as OAuthCodeRequestPayload))).toString();
    }

    public async exchangeCode(code: string): Promise<ExchangeCodeResponse | {
        success: boolean;
        message: string;
    }> {
        try {
            const requestBody: GoogleCodeExchangeRequest = {
                code,
                client_id: this.clientId as string,
                client_secret: this.clientSecret as string,
                grant_type: 'authorization_code',
                redirect_uri: this.googleClientConfig.redirectUrl
            }
            const res = await fetch(this.tokenUrl, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                method: "POST"
            });
            const data: ExchangeCodeResponse = await res.json() as ExchangeCodeResponse;
            await this.googleClientConfig.storeGoogleAccessToken!(data.access_token, data.expires_in);
            await this.googleClientConfig.storeGoogleRefreshToken!(data.refresh_token);
            return data;
        } catch (error) {
            throw new Error('Internal server error while trying to exchange code.');
        }
    }

    private accessTokenExpired(tokenExpireTime: number): boolean {
        const timeNow = Date.now() / 1000;
        return timeNow > tokenExpireTime;
    }

    private async exchangeRefreshToken(): Promise<{
        success: boolean;
        accessToken: string;
        expiresIn: number;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        accessToken?: undefined;
        expiresIn?: undefined;
    }> {
        try {
            const { refreshToken } = await this.googleClientConfig.getGoogleRefreshToken!();
            const requestPayload: GoogleRefreshTokenExchangeRequest = {
                client_id: this.clientId as string,
                client_secret: this.clientSecret as string,
                grant_type: 'refresh_token',
                redirect_uri: this.googleClientConfig.redirectUrl,
                refresh_token: refreshToken
            }
            const response = await fetch(this.tokenUrl, {
                body: JSON.stringify(requestPayload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data: GoogleRefreshTokenResponse = await response.json() as GoogleRefreshTokenResponse;
            await this.googleClientConfig.storeGoogleAccessToken!(data.access_token, data.expires_in);
            return {
                success: true,
                accessToken: data.access_token,
                expiresIn: data.expires_in
            }
        } catch (error) {
            return {
                success: false,
                message: 'Internal server error trying to exchange refresh token.'
            }                
        }
    }

    public async getAccessToken() {
        try {
            const { accessToken: oldAccessToken, expiresIn } = await this.googleClientConfig.getGoogleAccessToken!();
            if(this.accessTokenExpired(expiresIn)) {
                const { success, accessToken: newAccessToken, message } = await this.exchangeRefreshToken();
                if(!success) {
                    throw new Error(message);
                }
                return newAccessToken;
            }
            return oldAccessToken;
        } catch (error) {
            throw new Error('Failed to obtain or refresh the access token.')
        }
    }
}

export function CreateGoogleClient(googleClientConfig: GoogleClientConfig) {
    return new GoogleClient(googleClientConfig);
}
