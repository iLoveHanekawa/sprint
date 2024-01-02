import { Router } from 'express';
type SprintRouterConfig = {
    envPath: string;
};
/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key.
    * @returns {Router} An express router.
*/
export declare const getSprintRouter: (config: SprintRouterConfig) => Router;
export {};
