import type { NextFunction, Request, Response } from "express";
export declare const SprintMiddleware: (permissionCallback: (() => Promise<boolean>) | (() => boolean)) => (req: Request, res: Response<{
    status: boolean;
    error: string;
}>, next: NextFunction) => Promise<void | Response<{
    status: boolean;
    error: string;
}, Record<string, any>>>;
