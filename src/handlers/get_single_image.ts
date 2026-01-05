import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from "itty-router";

const getSongleImage = (request: IRequest) => {
    let imgageID = ALL_IMAGES.find(image => image.id.toString() == request.params.id);

    if (!imgageID) {
        return new Response("Image not found", { status: 404 });
    }
    return new Response(JSON.stringify(imgageID), {
        headers: { "Content-Type": "application/json" }
    });
}
export default getSongleImage;