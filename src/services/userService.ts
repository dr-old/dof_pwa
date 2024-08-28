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

// Get Users
export const getUser = async (id?: string) => {
  console.log("id", id);

  try {
    const response = await instance.get(`/person/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch user:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while trying to fetch user."
    );
  }
};

// Create User
export const createUser = async ({ data }: { data?: any }) => {
  try {
    const response = await instance.post(`/person`, data);
    return response.data;
  } catch (error: any) {
    console.log("Failed to create the user:", error);
    throw new Error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred while creating the user."
    );
  }
};

export const updateUser = async ({ data, id }: { data?: any; id?: string }) => {
  console.log(id, data);

  try {
    const response = await instance.put(`/person/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to update the user:", error);
    throw new Error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred while updating the user."
    );
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await instance.delete(`/person/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to delete the user:", error);
    throw new Error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred while deleting the user."
    );
  }
};

// Delete all users
export const deleteUsers = async (ids: string[]) => {
  for (const id of ids) {
    try {
      if (id) {
        await deleteUser(id);
        console.log(`Successfully deleted user for ${id}`);
      } else {
        console.warn(`No user found for ${id}`);
      }
    } catch (error: any) {
      console.log(`Failed to delete user for ${id}:`, error);
    }
  }
};
