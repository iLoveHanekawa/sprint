import { URLSearchParams } from 'url';
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
}
