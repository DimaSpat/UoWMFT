import {Hono} from "hono";
import type {Context} from "hono";

const authRoute = new Hono();

type User = {
    name: string;
    password: string;
}

authRoute.get('/test', (c: Context) => {
    console.log("authRoute");
    return c.json({message: "hello"}, 200);
});

export default authRoute;