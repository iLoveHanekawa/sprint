import express, { Request, Response } from 'express';
import { getSprintRouter } from '@ilovehanekawa/sprint/router/index.js';
import { dirname, resolve } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { connectDB } from './database/connect.js';
const app = express();
import { GoogleTokensModel } from './models/GoogleTokens.js';

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const basePath = resolve(dirname(currentModulePath), './.env');

app.get('/', async (req: Request, res: Response) => {
    return res.json({
        hello: "arjun"
    });
});

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173']
}));

app.use('/sprint', getSprintRouter({
    envPath: basePath,
    permissionCallback: () => true,
    storeGoogleAccessToken: async (accessToken: string, expiresIn: number) => {
        await GoogleTokensModel.findOneAndUpdate({
            token_type: 'access_token',
        }, { expires_in: Date.now() + (expiresIn * 1000), token_value: accessToken }, { upsert: true }).exec();
    },
    getGoogleAccessToken: async () => {
        const accessToken = await GoogleTokensModel.findOne({
            token_type: 'access_token'
        }).exec();
        return { accessToken: accessToken?.token_value as string, expiresIn: accessToken?.expires_in as number };
    },
    getGoogleRefreshToken: async () => {
        const refreshToken = await GoogleTokensModel.findOne({
            token_type: 'refresh_token'
        }).exec();
        return { refreshToken: refreshToken?.token_value as string };
    },
    storeGoogleRefreshToken: async (refreshToken: string) => {
        await GoogleTokensModel.findOneAndUpdate({
            token_type: 'refresh_token'
        }, { token_value: refreshToken }, { upsert: true }).exec();
    }
}));

app.listen(3000, async () => {
    try {
        await connectDB();
        console.log('server live at http://localhost:3000');
    } catch (error) {
        console.log(error);        
    }
});