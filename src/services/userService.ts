import { instance } from "./api";

interface Person {
  _id: string;
  fullname: string;
  birthday: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  token: string;
  user: Person;
}

interface SignUpResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Login
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await instance.post(`/login`, credentials);
    return response.data;
  } catch (error: any) {
    console.error("Failed to login:", error);
    throw new Error(
      error.response?.data?.error || "An error occurred while trying to login."
    );
  }
};

// Sign Up
export const signUp = async (credentials: {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<SignUpResponse> => {
  try {
    const data = {
      fullname: credentials.fullname,
      email: credentials.email,
      password: credentials.password,
    };
    const response = await instance.post(`/register`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to sign up:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while trying to sign up."
    );
  }
};

// Get Users
export const getUsers = async (): Promise<Person[]> => {
  try {
    const response = await instance.get(`/person`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while trying to fetch users."
    );
  }
};
