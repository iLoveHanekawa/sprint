import type { Request, Response } from "express";
export declare const MailController: {
    send: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
