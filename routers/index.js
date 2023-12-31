import express, { Router } from 'express';
import { sprintGreet, getEnv } from './controllers/SprintEnvController.js';
import { SprintMiddleware } from './middlewares/SprintMiddleware.js';
/**
    * Returns a sprint router to be used as a second argument to app.use()
    * @param {SprintRouterConfig} config - Object containing an 'envPath' key and a 'permissionCallback' key which is a function that returns a Promise<boolean> | boolean. Permission callback, by default, is a function that returns false.
    * @property {string} config.envPath - File path of the .env file.
    * @property {function(): boolean} config.permissionCallback - Function that controls access to the routes exposed by the Sprint Router.
    * @returns {Router} An express router.
    * @example
    * // Note: these configurations work for a .env file located at app root. Also the permission's callback here returns true as its merely an example.
    // Ideally the permission's callback would contain a way to authenticate an admin and only return true if a user with admin role is authenticated.
    // For production ALWAYS implement the permissionCallback to secure the application otherwise your env file can be exposed.
    const currentModuleURL = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleURL);
    const basePath = resolve(dirname(currentModulePath), './.env');
    app.use('/sprint', getSprintRouter({
        envPath: basePath,
        permissionCallback: () => true
    }));
*/
export const getSprintRouter = ({ envPath, permissionCallback = () => { return false; } }) => {
    const router = express.Router();
    router.get('/', sprintGreet);
    router.use(SprintMiddleware(permissionCallback));
    router.get('/get-env', getEnv(envPath));
    return router;
};
