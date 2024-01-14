import type { Request, Response } from "express";
import type { SprintGetEnvResponse } from "../index.js";
type GetEnvAsyncFunctionType = (req: Request, res: Response<SprintGetEnvResponse>) => Promise<void>;
/**
 * Controller for handling env mutations.
*/
export declare const SprintEnvController: {
    /**
        * Just a placeholder function to indicate that the sprint router is working.
        * @param {Request} req - Express request object
        * @param {Response} res - Express response object
        * @returns {Promise} Sends a json response containing a { sprint } key set to a message string.
    */
    sprintGreet: (req: Request, res: Response<{
        sprint: string;
    }>) => Promise<Response<{
        sprint: string;
    }, Record<string, any>>>;
    /**
        * This controller will either get an env file or create one and populate it with the variables required by Sprint.
        * @param {string} envPath - The { envPath } string that is a key in the SprintRouterConfig
        * @returns {GetEnvAsyncFunctionType} Returns a function that eventually returns a Promise<Response<SprintGetEnvResponse, Record<string, any>>>
    */
    getEnv: (envPath: string) => GetEnvAsyncFunctionType;
    /**
        * This controller will set the variables received from the Sprint dashboard to the .env file.
        * @param {string} envPath - The { envPath } string that is a key in the SprintRouterConfig
        * @returns {GetEnvAsyncFunctionType} Returns a function that eventually returns a Promise<Response<SprintGetEnvResponse, Record<string, any>>>
    */
    postEnv: (envPath: string) => GetEnvAsyncFunctionType;
};
export {};
