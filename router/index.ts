import express, { Router } from 'express';
import { SprintEnvController } from './controllers/SprintEnvController.js'
import { SprintMiddleware } from './middlewares/SprintMiddleware.js';
import { MailController } from './controllers/MailController.js';
import { GoogleClientController } from './controllers/GoogleClientController.js';
import { GoogleMiddleware } from './middlewares/GoogleClientMiddleware.js';

// TODO all keys gen

export interface SprintRouterGoogleClientConfig {
    storeGoogleAccessToken?: ((accessToken: string, expiresIn: number) => Promise<void>)
    storeGoogleRefreshToken?: ((refreshToken: string) => Promise<void>)
    getGoogleAccessToken?: (() => Promise<{ accessToken: string; expiresIn: number }>)
    getGoogleRefreshToken?: (() => Promise<{ refreshToken: string }>)
}

export type SprintRouterConfig = {
    envPath: string
    permissionCallback?: (() => Promise<boolean>) | (() => boolean)
} & SprintRouterGoogleClientConfig

type JSObject<T extends {}> = T

export type SprintVariables = JSObject<{ 
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    SMTP_HOST: string
    SMTP_FROM_EMAIL: string
    SMTP_USERNAME: string
    SMTP_PASSWORD: string
    SMTP_PORT: string
    SMTP_CONTENT_TYPE: 'text/plain' | 'text/html'
    SMTP_ENCRYPTION: string
    SMTP_CHARSET: string
    SMTP_DEBUG: string
    SMTP_TEST_RECIPIENT_EMAIL: string
    SMTP_TEST_SUBJECT: string
    SMTP_TEST_CONTENT: string
    [key: string]: string
}>

// TODO move this type elsewhere

export type SprintGetEnvResponse = { status: boolean, variables?: SprintVariables, error?: string, envPath?: string };

/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key and a 'permissionCallback' key which is a function that returns a Promise<boolean> | boolean. Permission callback, by default, is a function that returns false.
    * @property {string} config.envPath - File path of the .env file.
    * @property {function(): boolean} config.permissionCallback - Function that controls access to the routes exposed by the Sprint Router.
    * @returns {Router} An express router.
    * @example 
    * // Note: these configurations work for a .env file located at app root. Also the permission's callback here returns true as its merely an example.
    // Ideally the permission callback would contain a way to authenticate an admin and only return true if a user with admin role is authenticated.
    // For production ALWAYS implement the permissionCallback to secure the application otherwise your env file can be exposed.
    const currentModuleURL = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleURL);
    const basePath = resolve(dirname(currentModulePath), './.env');
    app.use('/sprint', getSprintRouter({
        envPath: basePath,
        permissionCallback: () => true
    }));
*/

export const getSprintRouter = ({ 
    envPath, 
    permissionCallback = () => { return false; }, 
    getGoogleAccessToken, 
    getGoogleRefreshToken, 
    storeGoogleAccessToken, 
    storeGoogleRefreshToken 
}: SprintRouterConfig): Router => {
    const router = express.Router();
    router.get('/', SprintEnvController.sprintGreet);
    router.use(SprintMiddleware(permissionCallback));
    router.get('/get-env', SprintEnvController.getEnv(envPath));
    router.post('/post-env', SprintEnvController.postEnv(envPath));
    router.post('/send', MailController.send(envPath));
    router.use('/google', GoogleMiddleware({ envPath, getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }));
    router.get('/google/consent', GoogleClientController.showConsentScreen({ getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }));
    router.get('/google/code', GoogleClientController.getTokens({ getGoogleAccessToken, getGoogleRefreshToken, storeGoogleAccessToken, storeGoogleRefreshToken }));
    return router; 
}
