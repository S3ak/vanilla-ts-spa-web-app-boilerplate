import { get } from "../api/client";

const postsApiEndpoint = "/posts";

/**
 * Fetches all poara.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export function getAllPosts() {
  return get(postsApiEndpoint);
}

/**
 * Fetches a single post by its ID.
 * @param {string|number} id The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 */
export function getPostById(id: string | number) {
  return get(`${postsApiEndpoint}/${id}`);
}
