// import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from "itty-router";
import { Env } from "../env";

const getSingleImage = async (request: IRequest, env: Env) => {
    let result
    console.log("getSingleImage params:", request.params); // Debug log
    try {
        result = await env.photo_web_app_DB.prepare(`
            SELECT i.*, c.display_name AS category_display_name
            FROM images i
            INNER JOIN image_categories c ON i.category_id = c.id
            WHERE i.id = ?1`
        )
            .bind(Number(request.params.id))
            .first();
        console.log("getSingleImage result:", result); // Debug log
    } catch (e) {
        let message
        if (e instanceof Error) message = e.message
        console.error({
            message: message,
            error: e
        })
        return new Response("Internal Server Error", { status: 500 });
    }
    if (!result) {
        return new Response("Image not found", { status: 404 });
    }
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}
export default getSingleImage;