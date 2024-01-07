import type { Request, Response } from "express";
import type { SprintGetEnvResponse } from "../index.js";
export declare const sprintGreet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getEnv: (envPath: string) => (req: Request, res: Response<SprintGetEnvResponse>) => Promise<void>;
