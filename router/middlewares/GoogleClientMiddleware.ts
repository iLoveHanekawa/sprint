import type { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import type { SprintRouterGoogleClientConfig } from "../index.js";

export interface GoogleMiddleWareParams extends SprintRouterGoogleClientConfig {
    envPath: string
}

export const GoogleMiddleware = (googleMiddleWareParams: GoogleMiddleWareParams) => (req: Request, res: Response, next: NextFunction) => {
    try {
        config({ path: googleMiddleWareParams.envPath });
        if(!process.env.GOOGLE_CLIENT_ID 
            || !process.env.GOOGLE_CLIENT_SECRET 
            || !googleMiddleWareParams.getGoogleAccessToken 
            || !googleMiddleWareParams.getGoogleRefreshToken 
            || !googleMiddleWareParams.storeGoogleAccessToken 
            || !googleMiddleWareParams.storeGoogleRefreshToken
        ) {
            const missingEnv = [];
            const missingConfig = [];
            if(!process.env.GOOGLE_CLIENT_ID) {
                missingEnv.push('GOOGLE_CLIENT_ID');
            }
            if(!process.env.GOOGLE_CLIENT_SECRET) {
                missingEnv.push('GOOGLE_CLIENT_SECRET');
            }
            if(!googleMiddleWareParams.getGoogleAccessToken) missingConfig.push('getGoogleAccessToken');
            if(!googleMiddleWareParams.getGoogleRefreshToken) missingConfig.push('getGoogleRefreshToken');
            if(!googleMiddleWareParams.storeGoogleAccessToken) missingConfig.push('storeGoogleAccessToken');
            if(!googleMiddleWareParams.storeGoogleRefreshToken) missingConfig.push('storeGoogleRefreshToken');

            res.json({
                success: false,
                message: '{ env } key denotes the missing environment variables. { googleConfig } key denotes the missing functions in the { getSprintRouter } function.', 
                errors: { 
                    missing_config: {
                        env: missingEnv,
                        googleConfig: missingConfig
                }}
            })
        }
        return next();
    } catch (error) {
        console.log(error);        
    }
}