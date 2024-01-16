import type { NextFunction, Request, Response } from "express";
import type { SprintRouterGoogleClientConfig } from "../index.js";
export interface GoogleMiddleWareParams extends SprintRouterGoogleClientConfig {
    envPath: string;
}
export declare const GoogleMiddleware: (googleMiddleWareParams: GoogleMiddleWareParams) => (req: Request, res: Response, next: NextFunction) => void;
