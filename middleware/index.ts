import express, { type NextFunction, type Request, type Response } from 'express'

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        "hello": "from middleware"
    }) 
});

export const sprintMiddleware = router;
