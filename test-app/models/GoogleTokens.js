import { Schema, model } from 'mongoose';
const GoogleTokensSchema = new Schema({
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
