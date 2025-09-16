export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

export interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  likedBy: Set<string>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
}

export interface AppState {
  posts?: Post[];
  auth?: AuthState;
  currentPage?: string;
}

export interface Meta {
  barcode: string;
  createdAt: Date;
  qrCode: string;
  updatedAt: Date;
}

export type ReturnPolicy =
  | "No return policy"
  | "30 days return policy"
  | "60 days return policy"
  | "7 days return policy"
  | "90 days return policy";

export interface Review {
  comment: string;
  date: Date;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

// Create a clean object to send to our service
export interface ErrorReport {
  message: string;
  stack: string;
  timestamp: string;
  url: string;
}

// ## Define our custom error types

export class ValidationError extends Error {
  constructor(message: string) {
    // Call the parent constructor
    super(message);
    // Set the error name to the class name
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}
