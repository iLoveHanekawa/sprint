import type { NextFunction, Request, Response } from "express"

export const SprintMiddleware = (permissionCallback: (() => Promise<boolean>) | (() => boolean)) => async (req: Request, res: Response<{ status: boolean, error: string }>, next: NextFunction) => {
    try {            
        let possiblePromise = permissionCallback();
        if(possiblePromise && typeof (possiblePromise as Promise<boolean>).then === 'function' && (possiblePromise as Promise<boolean>)[Symbol.toStringTag] === 'Promise') {
            possiblePromise = await possiblePromise;
        }
        if(typeof possiblePromise === 'boolean' && possiblePromise === true) {
            return next();
        }
        else {
            return res.status(401).json({
                status: false,
                error: 'Unauthorized access.'
            });
        }
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message);
        }
        return res.status(500).json({
            status: false,
            error: 'Internal server error.'
        })
    }
}

