import type { Post, PostsResponse } from "../../types/dummyjson-types";
import { get } from "../api/client";

const postsApiEndpoint = "/social/posts";

/**
 * Fetches all posts.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await get<{ data: Post[] }>(postsApiEndpoint);
    // Noroff API returns { data: [...] }
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

/**
 * Fetches a single post by its ID.
 * @param {string|number} id The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 */
export async function getPostById(id: Post["id"]): Promise<Post> {
  const data = await get<Post>(`${postsApiEndpoint}/${id}`);
  return data;
}
