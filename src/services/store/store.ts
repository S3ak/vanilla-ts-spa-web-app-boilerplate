import type { AppState } from "../../types";

const INITIAL_STATE: AppState = {
  products: [],
  auth: {
    token: null,
    isAuthenticated: false,
    isLoggedIn: false,
    user: {
      image: "https://i.pravatar.cc/150?img=34",
      username: "dondada",
      firstName: "Skuba",
      lastName: "Koooper",
      id: 12345,
      email: "skub@mail.com",
      phone: "4121234567",
    },
  },
  cart: [],
  currentPage: "/",
  selectedProduct: null,
  numberOfItems: 2,
};

export const state = INITIAL_STATE;

const createAppState = () => ({
  posts: [],
  users: ["Alice", "Bob", "Charlie", "Diana"],
  currentUser: "Alice",
  nextId: 1,
});

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  likedBy: Set<string>;
}

interface AppPostsState {
  posts: Post[];
  users: string[];
  currentUser: string;
  nextId: number;
}

interface StateTransformers {
  addPost: (state: AppPostsState, content: string) => AppPostsState;
  toggleLike: (state: AppPostsState, postId: string) => AppPostsState;
  setCurrentUser: (state: AppPostsState, user: string) => AppPostsState;
}

const stateTransformers: StateTransformers = {
  addPost: (state, content) => ({
    ...state,
    posts: [
      {
        id: crypto.randomUUID(),
        content: content.trim(),
        author: state.currentUser,
        timestamp: new Date(),
        likes: 0,
        likedBy: new Set(),
      },
      ...state.posts,
    ],
    nextId: state.nextId + 1,
  }),

  toggleLike: (state, postId) => ({
    ...state,
    posts: state.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: post.likedBy.has(state.currentUser)
              ? post.likes - 1
              : post.likes + 1,
            likedBy: (() => {
              const newSet = new Set(post.likedBy);
              newSet.has(state.currentUser)
                ? newSet.delete(state.currentUser)
                : newSet.add(state.currentUser);
              return newSet;
            })(),
          }
        : post
    ),
  }),

  setCurrentUser: (state, user) => ({
    ...state,
    currentUser: user,
  }),
};
