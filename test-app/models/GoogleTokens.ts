import { Document, Schema, model } from 'mongoose';

interface Token {
    token_type: 'access_token' | 'refresh_token',
    expires_in?: number
    token_value: string
}

interface TokenDocument extends Token, Document {}

const GoogleTokensSchema = new Schema<TokenDocument>({
    token_type: {
        type: String,
        enum: ['access_token', 'refresh_token'],
        required: true
    },
    token_value: {
        type: String,
        required: true,
    },
    expires_in: {
        type: Number,
    }
});

export const GoogleTokensModel = model('GoogleToken', GoogleTokensSchema);
