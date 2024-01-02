import express, { Router } from 'express';
import { existsSync, readFile, writeFile } from 'fs';
import dotenv from 'dotenv';
/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key.
    * @returns {Router} An express router.
*/
export const getSprintRouter = (config) => {
    const envKeyArr = [
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
    router.get('/', async (req, res, next) => {
        return res.json({
            hello: "from middleware"
        });
    });
    router.get('/get-env', async (req, res, next) => {
        readFile(config.envPath, { encoding: 'utf8', flag: 'a+' }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            }
            const envObj = dotenv.parse(data);
            let dataToWrite = '';
            envKeyArr.forEach((value, index) => {
                if (!(value in envObj))
                    dataToWrite += `\n${value}=`;
            });
            writeFile(config.envPath, dataToWrite, { flag: 'a+' }, (err) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
            });
            return res.json({
                status: true
            });
        });
    });
    return router;
};
