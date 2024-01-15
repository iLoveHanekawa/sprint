import { URLSearchParams } from 'url';
import fetch from 'node-fetch';
class GoogleClient {
    //TODO state
    constructor(googleClientConfig) {
        this.oauthCodeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        this.scopes = 'https://mail.google.com/';
        this.clientId = process.env.GOOGLE_CLIENT_ID;
        this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        this.tokenUrl = 'https://oauth2.googleapis.com/token';
        this.googleClientConfig = googleClientConfig;
    }
    getURLForConsentScreen() {
        return this.oauthCodeUrl + '?' + (new URLSearchParams({
            scope: this.scopes,
            access_type: 'offline',
            include_granted_scopes: 'true',
            client_id: this.clientId,
            prompt: 'consent',
            redirect_uri: this.googleClientConfig.redirectUrl,
            response_type: 'code',
            state: 'state_parameter_passthrough_value'
        })).toString();
    }
    async exchangeCode(code) {
        try {
            const requestBody = {
                code,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: this.googleClientConfig.redirectUrl
            };
            const res = await fetch(this.tokenUrl, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                method: "POST"
            });
            const data = await res.json();
            await this.googleClientConfig.storeGoogleAccessToken(data.access_token, data.expires_in);
            await this.googleClientConfig.storeGoogleRefreshToken(data.refresh_token);
            return data;
        }
        catch (error) {
            throw new Error('Internal server error while trying to exchange code.');
        }
    }
    accessTokenExpired(tokenExpireTime) {
        const timeNow = Date.now() + 300000;
        console.log({ timeNow, tokenExpireTime });
        return timeNow > tokenExpireTime;
    }
    async exchangeRefreshToken() {
        try {
            const { refreshToken } = await this.googleClientConfig.getGoogleRefreshToken();
            const requestPayload = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'refresh_token',
                redirect_uri: this.googleClientConfig.redirectUrl,
                refresh_token: refreshToken
            };
            const response = await fetch(this.tokenUrl, {
                body: JSON.stringify(requestPayload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            await this.googleClientConfig.storeGoogleAccessToken(data.access_token, data.expires_in);
            return {
                success: true,
                accessToken: data.access_token,
                expiresIn: data.expires_in
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Internal server error trying to exchange refresh token.'
            };
        }
    }
    async getAccessToken() {
        try {
            const { accessToken: oldAccessToken, expiresIn } = await this.googleClientConfig.getGoogleAccessToken();
            if (this.accessTokenExpired(expiresIn)) {
                const { success, accessToken: newAccessToken, message } = await this.exchangeRefreshToken();
                if (!success) {
                    throw new Error(message);
                }
                return newAccessToken;
            }
            return oldAccessToken;
        }
        catch (error) {
            throw new Error('Failed to obtain or refresh the access token.');
        }
    }
}
export function CreateGoogleClient(googleClientConfig) {
    return new GoogleClient(googleClientConfig);
}
