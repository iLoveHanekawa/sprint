import type { NextFunction, Request, Response } from "express";
type SprintMiddlewareResponse = {
    status: boolean;
    error: string;
};
/**
 * Middleware for access control.
 * @param {(() => Promise<boolean>) | (() => boolean)} permissionCallback - Callback function to check permissions.
 * @returns {() => Promise} Express middleware function.
*/
export declare const SprintMiddleware: (permissionCallback: (() => Promise<boolean>) | (() => boolean)) => (req: Request, res: Response<SprintMiddlewareResponse>, next: NextFunction) => Promise<void | Response<SprintMiddlewareResponse, Record<string, any>>>;
export {};
