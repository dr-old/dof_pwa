import { instance } from "./api";

interface TicketResponse {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create Ticket
export const createTicket = async ({ data }: { data?: any }) => {
  try {
    const response = await instance.post(`/ticket`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create the ticket:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while creating the ticket."
    );
  }
};

// Get Tickets
export const getTickets = async () => {
  try {
    const response = await instance.get(`/ticket`);
    return response.data?.data;
  } catch (error: any) {
    console.error("Failed to fetch tickets:", error);
    throw new Error(
      error.response?.data?.error || "An error occurred while fetching tickets."
    );
  }
};

// Update Ticket
export const updateTicket = async ({
  data,
  id,
}: {
  data?: any;
  id?: string;
}) => {
  try {
    const response = await instance.put(`/ticket/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to update the ticket:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while updating the ticket."
    );
  }
};

// Delete Ticket
export const deleteTicket = async (id: string) => {
  try {
    const response = await instance.delete(`/ticket/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to delete the ticket:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while deleting the ticket."
    );
  }
};
