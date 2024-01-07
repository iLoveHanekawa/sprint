export const SprintMiddleware = (permissionCallback) => async (req, res, next) => {
    try {
        let possiblePromise = permissionCallback();
        if (possiblePromise && typeof possiblePromise.then === 'function' && possiblePromise[Symbol.toStringTag] === 'Promise') {
            possiblePromise = await possiblePromise;
        }
        if (typeof possiblePromise === 'boolean' && possiblePromise === true) {
            return next();
        }
        else {
            return res.status(401).json({
                status: false,
                error: 'Unauthorized access.'
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return res.status(500).json({
            status: false,
            error: 'Internal server error.'
        });
    }
};
