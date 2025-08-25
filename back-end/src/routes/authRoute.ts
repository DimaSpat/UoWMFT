import {Hono} from "hono";
import type {Context} from "hono";

const authRoute = new Hono();

type User = {
    name: string;
    password: string;
}

authRoute.get('/google', (c: Context) => {
    return c.json({message: "google"}, 200);
});

authRoute.get('/telegram', (c: Context) => {
    return c.json({message: "telegram"}, 200);
});

export default authRoute;