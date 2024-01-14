import { URLSearchParams } from 'url';
import fetch from 'node-fetch';
export class GoogleClient {
    constructor(googleClientConfig) {
        this.oauthCodeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        this.scopes = 'https://mail.google.com/';
        this.redirectUrl = googleClientConfig.redirectUrl;
        this.clientId = process.env.GOOGLE_CLIENT_ID;
        this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        this.tokenUrl = 'https://oauth2.googleapis.com/token';
    }
    getURLForConsentScreen() {
        return this.oauthCodeUrl + '?' + (new URLSearchParams({
            scope: this.scopes,
            access_type: 'offline',
            include_granted_scopes: 'true',
            client_id: this.clientId,
            prompt: 'consent',
            redirect_uri: this.redirectUrl,
            response_type: 'code',
            state: 'state_parameter_passthrough_value'
        })).toString();
    }
    async getCodeExchangeRequestBody(code) {
        const requestBody = {
            code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: this.redirectUrl
        };
        const res = await fetch(this.tokenUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            method: "POST"
        });
        const data = await res.json();
        return data;
    }
}
