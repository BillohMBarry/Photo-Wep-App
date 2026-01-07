import { Env } from "../env";
import { IRequest } from "itty-router";

interface ImageRequest {
  id: string;
  url: string;
  title: string;
  author: string;
  category_id: number;
  user_id: number;
  format: string;
  resolution: string;
  file_size_bytes: number;
}

const createImage = async (request: IRequest, env: Env) => {
    const imageRequest = await request.json() as ImageRequest;
    let newImage;
    try {
        newImage = await env.photo_web_app_DB.prepare(`
            INSERT INTO images
            (category_id, user_id, image_url, title,
            format, resolution, file_size_bytes)
            VALUES
            (?1, ?2, ?3, ?4, ?5, ?6, ?7)
          `)
          .bind(
            imageRequest.category_id,
            imageRequest.user_id,
            imageRequest.url,
            imageRequest.title,
            imageRequest.format,
            imageRequest.resolution,
            imageRequest.file_size_bytes
          )
          .run()
    } catch (e) {
        let message
        if (e instanceof Error) message = e.message
        console.error({
            message: message,
        })
       
    }
    if(!newImage) {
        return new Response("An error occurred", { status: 500 });
    }    
    return new Response(JSON.stringify(newImage), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    })
}

export default createImage;