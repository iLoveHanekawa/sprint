import type { NextFunction, Request, Response } from "express"

type SprintMiddlewareResponse = { status: boolean, error: string }

/**
 * Middleware for access control.
 * @param {(() => Promise<boolean>) | (() => boolean)} permissionCallback - Callback function to check permissions.
 * @returns {() => Promise} Express middleware function.
*/
export const SprintMiddleware = (permissionCallback: (() => Promise<boolean>) | (() => boolean)): (req: Request, res: Response<SprintMiddlewareResponse>, next: NextFunction) => Promise<void | Response<SprintMiddlewareResponse, Record<string, any>>> => async (req: Request, res: Response<{ status: boolean, error: string }>, next: NextFunction) => {
    try {    
        // Call the provided permission callback        
        let possiblePromise = permissionCallback();
        // If the result is a promise, await its resolution
        if(possiblePromise && typeof (possiblePromise as Promise<boolean>).then === 'function' && (possiblePromise as Promise<boolean>)[Symbol.toStringTag] === 'Promise') {
            possiblePromise = await possiblePromise;
        }
        // If the result is a boolean and true, proceed to the next middleware
        if(typeof possiblePromise === 'boolean' && possiblePromise === true) {
            return next();
        }
        else {
            // If permissions check fails, return a 401 Unauthorized response
            return res.status(401).json({
                status: false,
                error: 'Unauthorized access.'
            });
        }
    } catch (error) {
        // Handle errors and return a 500 Internal Server Error response
        if(error instanceof Error) {
            console.log(error.message);
        }
        return res.status(500).json({
            status: false,
            error: 'Internal server error.'
        })
    }
}
