import { URLSearchParams } from 'url';

type OAuthCodeRequestPayload = {
    scope: string
    access_type: string
    include_granted_scopes: 'true' | 'false'
    response_type: 'code'
    state: 'state_parameter_passthrough_value'
    redirect_uri: string
    client_id: string
    prompt: 'consent'
}

export class GoogleClient {
    oauthCodeUrl: string;
    scopes: string;
    redirectUrl: string;
    clientId: string | undefined;
    clientSecret: string | undefined;
    tokenUrl: string;

    constructor(googleClientConfig: { redirectUrl: string }) {
        this.oauthCodeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        this.scopes = 'https://mail.google.com/';
        this.redirectUrl = googleClientConfig.redirectUrl;
        this.clientId = process.env.GOOGLE_CLIENT_ID;
        this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        this.tokenUrl = 'https://oauth2.googleapis.com/token';
    }

    public getURLForConsentScreen(): string {
        return this.oauthCodeUrl + '?' + (new URLSearchParams({
            scope: this.scopes,
            access_type: 'offline',
            include_granted_scopes: 'true',
            client_id: this.clientId,
            prompt: 'consent',
            redirect_uri: this.redirectUrl,
            response_type: 'code',
            state: 'state_parameter_passthrough_value'
        } as OAuthCodeRequestPayload)).toString();
    }
}
