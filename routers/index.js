import express, { Router } from 'express';
import { readFile, writeFile } from 'fs';
import dotenv from 'dotenv';
/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key and a 'permissionCallback' key which is a function that returns a Promise<boolean> | boolean. Permission callback, by default, is a function that returns false.
    * @property {string} config.envPath - File path of the .env file.
    * @property {function(): boolean} config.permissionCallback - Function that controls access to the routes exposed by the Sprint Router.
    * @returns {Router} An express router.
    * @example
    * // Note: these configurations work for a .env file located at app root. Also the permission's callback here returns true as its merely an example.
    // Ideally the permission's callback would contain a way to authenticate an admin and only return true if a user with admin role is authenticated.
    // For production ALWAYS implement the permission's callback to secure the application otherwise your env file can be exposed to anyone who goes to www.example.com/sprint.
    const currentModuleURL = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleURL);
    const basePath = resolve(dirname(currentModulePath), './.env');
    app.use('/sprint', getSprintRouter({
        envPath: basePath,
        permissionCallback: () => true
    }));
*/
export const getSprintRouter = ({ envPath, permissionCallback = () => { return false; } }) => {
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
    const router = express.Router();
    router.use(async (req, res, next) => {
        try {
            let possiblePromise = permissionCallback();
            if (possiblePromise && typeof possiblePromise.then === 'function' && possiblePromise[Symbol.toStringTag] === 'Promise') {
                possiblePromise = await possiblePromise;
            }
            if (typeof possiblePromise === 'boolean' && possiblePromise === true) {
                return next();
            }
            else {
                return res.status(401).json({
                    status: false,
                    error: 'Unauthorized access.'
                });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            return res.status(500).json({
                status: false,
                error: 'Internal server error.'
            });
        }
    });
    router.get('/', async (req, res) => {
        return res.json({
            hello: "from middleware"
        });
    });
    router.get('/get-env', async (req, res) => {
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
    });
    return router;
};
