import type { Request, Response } from "express";
import type { SprintGetEnvResponse, SprintVariables } from "../index.js";
import { readFile, writeFile } from "fs";
import dotenv from 'dotenv';

// Please note that Promise<void> is not actually returned. Its actual return type is Promise<Response<SprintGetEnvResponse, Record<string, any>>> 
type GetEnvAsyncFunctionType = (req: Request, res: Response<SprintGetEnvResponse>) => Promise<void>;

export const SprintEnvController = {
    /**
        * Just a placeholder function to indicate that the sprint router is working.
        * @param {Request} req - Express request object
        * @param {Response} res - Express response object
        * @returns {Promise} - Sends a json response containing a { sprint } key set to a message string. 
    */
    sprintGreet: async (req: Request, res: Response<{sprint: string}>): Promise<Response<{ sprint: string; }, Record<string, any>>> => {
        return res.json({
            sprint: "Sprint router is working."
        });
    },
    /**
        * Just a placeholder function to indicate that the sprint router is working.
        * @param {string} envPath - The { envPath } string that is a key in the SprintRouterConfig
        * @returns {GetEnvAsyncFunctionType} - Returns a function that eventually returns a Promise<Response<SprintGetEnvResponse, Record<string, any>>>
    */
    getEnv: (envPath: string): GetEnvAsyncFunctionType => async (req: Request, res: Response<SprintGetEnvResponse>) => {
        // The env variables to look for. 
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
            'SMTP_DEBUG',
        ];
        // Read or create env file.
        readFile(envPath, { encoding: 'utf8', flag: 'a+'}, (err: NodeJS.ErrnoException | null, data: string) => {
            if(err) {
                return res.status(500).json({
                    status: false,
                    error: err.message,
                });
            }
            const envObj = dotenv.parse<SprintVariables>(data);
            let dataToWrite = '';
            // If a variable from { envKeyArr } is not already present in the env file, create it with empty string value.
            envKeyArr.forEach((value, index) => {
                if(!(value in envObj)) dataToWrite += `\n${value}=`;
            })
            // Write the above data to file.
            writeFile(envPath, dataToWrite, { encoding: 'utf8', flag: 'a+' }, (err: NodeJS.ErrnoException | null) => {
                if(err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
            })
            // Read the same file again and obtain the values for all the variables and send them as a response.
            readFile(envPath, { encoding: 'utf8', flag: 'r'}, (err: NodeJS.ErrnoException | null, data: string) => {
                if(err) {
                    return res.status(500).json({
                        status: false,
                        error: err.message,
                    });
                }
                return res.json({
                    status: true,
                    variables: dotenv.parse<SprintVariables>(data),
                    envPath: envPath
                });
            });
        });
    }
}
