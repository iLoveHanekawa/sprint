import { readFile, writeFile } from "fs";
import dotenv from 'dotenv';
export const sprintGreet = async (req, res) => {
    return res.json({
        sprint: "Sprint router is working."
    });
};
export const getEnv = (envPath) => async (req, res) => {
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
    ];
    readFile(envPath, { encoding: 'utf8', flag: 'a+' }, (err, data) => {
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
        writeFile(envPath, dataToWrite, { encoding: 'utf8', flag: 'a+' }, (err) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            }
        });
        readFile(envPath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            }
            return res.json({
                status: true,
                variables: dotenv.parse(data),
                envPath: envPath
            });
        });
    });
};
