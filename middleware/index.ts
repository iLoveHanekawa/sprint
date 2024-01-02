import express, { Router, type Request, type Response } from 'express';
import { readFile, writeFile } from 'fs';
import dotenv from 'dotenv';

type SprintRouterConfig = {
    envPath: string
}

type JSObject<T extends {}> = T

type SprintVariables = JSObject<{ 
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
}>

/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key.
    * @returns {Router} An express router.
*/
export const getSprintRouter = (config: SprintRouterConfig): Router => {
    const envKeyArr: string[] = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'SMTP_HOST',
        'SMTP_FROM_EMAIL',
        'SMTP_USERNAME',
        'SMTP_PASSWORD',
        'SMTP_PORT',
        'SMTP_CONTENT_TYPE',
        'SMTP_ENCRYPTION',
        'SMTP_CHARSET',
        'SMTP_DEBUG'
    ];
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        return res.json({
            hello: "from middleware"
        });
    });

    router.get('/get-env', async (req: Request, res: Response<{ status: boolean, variables?: SprintVariables, error?: string}>) => {
        readFile(config.envPath, { encoding: 'utf8', flag: 'a+'}, (err, data) => {
            if(err) {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            }
            const envObj = dotenv.parse<SprintVariables>(data);
            let dataToWrite = '';
            envKeyArr.forEach((value, index) => {
                if(!(value in envObj)) dataToWrite += `\n${value}=`;
            })
            writeFile(config.envPath, dataToWrite, { flag: 'a+' }, (err) => {
                if(err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
            })
            readFile(config.envPath, { encoding: 'utf8', flag: 'r'}, (err, data) => {
                if(err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
                return res.json({
                    status: true,
                    variables: dotenv.parse<SprintVariables>(data)
                });
            });
        });
        return res.json({
            status: false,
            error: 'Something went wrong. Raise an issue at https://github.com/iLoveHanekawa/sprint/issues'
        })
    });
    return router;
}
