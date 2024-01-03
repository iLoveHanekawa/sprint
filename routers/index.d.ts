import { Router } from 'express';
type SprintRouterConfig = {
    envPath: string;
    permissionCallback?: (() => Promise<boolean>) | (() => boolean);
};
type JSObject<T extends {}> = T;
export type SprintVariables = JSObject<{
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    SMTP_HOST: string;
    SMTP_FROM_EMAIL: string;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_PORT: string;
    SMTP_CONTENT_TYPE: 'text/plain' | 'text/html';
    SMTP_ENCRYPTION: string;
    SMTP_CHARSET: string;
    SMTP_DEBUG: string;
}>;
export type SprintGetEnvResponse = {
    status: boolean;
    variables?: SprintVariables;
    error?: string;
    envPath?: string;
};
/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key and a 'permissionCallback' key which is a function that returns a Promise<boolean> | boolean. Permission callback, by default, is a function that returns false.
    * @property {string} config.envPath - File path of the .env file.
    * @property {function(): boolean} config.permissionCallback - Function that controls access to the routes exposed by the Sprint Router.
    * @returns {Router} An express router.
*/
export declare const getSprintRouter: ({ envPath, permissionCallback }: SprintRouterConfig) => Router;
export {};
