import {Hono} from "hono";
import {logger} from "hono/logger";

import authRoute from "./routes/authRoute.ts";

const app = new Hono({strict: true});
const api = new Hono();

app.use(logger());

app.route('/api/auth', authRoute);

export default {
    port: Bun.env.PORT || 5000,
    fetch: app.fetch,
};