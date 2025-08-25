import {Hono} from "hono";
import {logger} from "hono/logger";
import {cors} from "hono/cors";

import authRoute from "./routes/authRoute.ts";

const app = new Hono({strict: true});
const api = new Hono();

app.use(logger());
app.use(cors({
    origin: Bun.env.CORS_ORIGIN || "*",
}));

app.route('/api/auth', authRoute);

export default {
    port: Bun.env.PORT || 5000,
    fetch: app.fetch,
};