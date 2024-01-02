import express, { Router } from 'express';
import { readFile, writeFile } from 'fs';
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
        'SMTP_DEBUG',
        'SPRINT_AUTH_KEY'
    ];
    const router = express.Router();
    router.use(async (req, res, next) => {
        const authHeader = req.header('authorization');
        const token = authHeader?.split(' ')[1];
        readFile(config.envPath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            }
            else {
                if (token === dotenv.parse(data).SPRINT_AUTH_KEY) {
                    next();
                }
                else {
                    return res.status(401).json({
                        status: false,
                        error: "Can't access unauthorized route."
                    });
                }
            }
        });
    });
    router.get('/', async (req, res) => {
        return res.json({
            hello: "from middleware"
        });
    });
    router.get('/get-env', async (req, res) => {
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
            writeFile(config.envPath, dataToWrite, { encoding: 'utf8', flag: 'a+' }, (err) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
            });
            readFile(config.envPath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
                return res.json({
                    status: true,
                    variables: dotenv.parse(data),
                    envPath: config.envPath
                });
            });
        });
    });
    return router;
};
