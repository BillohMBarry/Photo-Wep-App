import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Photo Web App', () => {
	it("returns a 404 if a non-existent endpoint is called", async () => {
		const res = await SELF.fetch(
			'http://localhost/non-existent-endpoint',
		)
		expect(res.status).toEqual(404)
	})
});
describe("GET /images", () => {
	it("returns a 200 ok response", async () => {
		const res = await SELF.fetch(
			'https://example.com/images',
		)
		expect(res.status).toEqual(200)
	})
})
describe("GET /images", () => {
	it("should return a 200 OK response", async () => {
		const response = await SELF.fetch(
			'http://www.example.com/images'
		);
		expect(response.status).toEqual(200);
	});
	it("should return images in the response", async () => {
		const response = await SELF.fetch('http://www.example.com/images');
		const json = await response.json();
		expect(json).toEqual(
			expect.arrayContaining([
				expect.objectContaining(
					{
						id: 3, url: 'https://example.com/image3.jpg', title: 'Forest trail',
						author: 'Emily Johnson'
					}
				)]));
	});
});
it("should return a set number of images if count is provided", async () => {
	const res = await SELF.fetch('http://www.example.com/images?count=2');
	const json = await res.json();
	expect(json).toHaveLength(2);
})
describe("POST /images", () => {
	it("should return a 201 response code", async () => {
		const payLoad = {
			id: 4,
			url: "https://example.com/image4.jpg",
			author: "Michael Brown"
		}
		const res = await SELF.fetch('http://www.example.com/images', {
			method: 'POST',
			body: JSON.stringify(payLoad),

		})
		expect(res.status).toEqual(201);
	})
	it("should return the created image in the response", async () => {
		const newImage = {
			id: 4,
			url: "https://example.com/image4.jpg",
			author: "Michael Brown"
		}
		const res = await SELF.fetch('http://www.example.com/images', {
			method: 'POST',
			body: JSON.stringify(newImage),
		})
		const json = await res.json();
		expect(json).toEqual(
			expect.objectContaining(
				newImage
			)
		);
	})
});

describe("GET /images/:id", () => {
	it("returns a 200 OK response when image exists", async () => {
		const res = await SELF.fetch('http://example.com/images/1');
		expect(res.status).toEqual(200);
		const json = await res.json();
		expect(json).toEqual(
			expect.objectContaining({
				id: 1
			})
		);
	});

	it("returns a 404 response when image does not exist", async () => {
		const res = await SELF.fetch('http://example.com/images/999');
		expect(res.status).toEqual(404);
	});
});		