import type { NextFunction, Request, Response } from "express";
export declare const GoogleMiddleware: (envPath: string) => (req: Request, res: Response, next: NextFunction) => void;
