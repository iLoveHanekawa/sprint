import express, { Request, Response } from 'express';
import { getSprintRouter } from '@ilovehanekawa/sprint/routers/index.js';
import { dirname, resolve } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
const app = express();

const someObject: { a: number, b: number, [key: string]: number} = {
    a: 1,
    b: 1,
}

const objectKeys = <T extends Record<PropertyKey, any>> (obj: T): (keyof T)[] => {
    return Object.keys(obj) as (keyof T)[];
}

Object.keys(someObject).forEach((key) => {
    console.log(someObject[key]);
})


const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const basePath = resolve(dirname(currentModulePath), './.env');

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    return res.json({
        hello: "arjun"
    });
});

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use('/sprint', getSprintRouter({
    envPath: basePath,
    permissionCallback: () => true
}));

app.listen(3000, () => {
    console.log('server live at http://localhost:3000');
});