export const baseUrl = "http://localhost:3012/";

export const filterTicket = [
  { title: "None", value: "" },
  { title: "Detail", value: "title" },
  { title: "Customer Name", value: "assignedTo.fullname" },
  { title: "Date", value: "createdAt" },
  { title: "Priority", value: "priority" },
];

export const sortLabel = [
  { title: "None", value: "" },
  { title: "Ascending", value: "asc" },
  { title: "Descending", value: "desc" },
];

export const priorityTicket = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
];
