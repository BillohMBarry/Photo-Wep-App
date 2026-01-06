/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;
import { Env } from "./env";
import { Router } from "itty-router";
import getImage from "./handlers/get_images";
import createImage from "./handlers/create_images";
import getSingleImage from "./handlers/get_single_image";

const router = Router();


router.get("/", () => new Response("Welcome to the Photo Web App API!"))
	.get("/images", getImage)
	.get("/images/", getImage)
	.get("/images/:id", getSingleImage)
	.post("/images", createImage)
	.all('*', (req) => new Response(`Not Found. Path: ${req.url}`, { status: 404 }));



export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return router.fetch(request, env, ctx);
	},
};