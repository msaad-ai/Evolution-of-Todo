/**
 * Mock authentication implementation for testing.
 * This creates fake JWT tokens for local testing without requiring Better Auth.
 */

interface MockUser {
  id: string;
  email: string;
  password: string;
}

// LocalStorage key for mock users
const MOCK_USERS_KEY = "mock_users";

/**
 * Get all mock users from localStorage.
 */
function getMockUsers(): MockUser[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save mock users to localStorage.
 */
function saveMockUsers(users: MockUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

/**
 * Generate a proper JWT token using HMAC-SHA256.
 * This creates a real JWT that the backend can verify.
 */
async function generateMockToken(userId: string, email: string): Promise<string> {
  const secret = process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET not configured");
  }

  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: userId,
    email: email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  };

  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, "");
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, "");
  const message = `${encodedHeader}.${encodedPayload}`;

  // Use Web Crypto API to sign the token
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

/**
 * Mock signup function.
 */
export async function mockSignUp(email: string, password: string) {
  const mockUsers = getMockUsers();

  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create new user
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newUser: MockUser = { id: userId, email, password };
  mockUsers.push(newUser);
  saveMockUsers(mockUsers);

  // Generate token
  const token = await generateMockToken(userId, email);

  return {
    token,
    user: {
      id: userId,
      email,
    },
  };
}

/**
 * Mock signin function.
 */
export async function mockSignIn(email: string, password: string) {
  const mockUsers = getMockUsers();

  // Find user
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = await generateMockToken(user.id, user.email);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

/**
 * Mock signout function.
 */
export async function mockSignOut() {
  // Just clear local storage
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
  }
}

/**
 * Get current session.
 */
export async function mockGetSession() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("auth_token");
  const userId = localStorage.getItem("user_id");

  if (!token || !userId) return null;

  return {
    token,
    user: {
      id: userId,
      email: `${userId}@example.com`,
    },
  };
}
