import axios from "@services/axiosInstance";

export const addSubjectToMentor = async ({ email, subject }) => {
  try {
    const response = await axios.patch("auth/admin/add-subject", {
      email,
      subject,
    });
    return response.data;
  } catch (error) {
    // Axios interceptors already handle & format errors
    throw error;
  }
};

export const removeSubjectFromMentor = async ({ email, subject }) => {
  const response = await axios.patch("/auth/admin/remove-subject", {
    email,
    subject,
  });
  return response.data;
};

export const addUser = async (data) => {
  const response = await axios.post("/auth/admin/add-user", data);
  return response.data;
};

export const removeUser = async ({ email }) => {
    const response = await axios.delete("/auth/admin/delete-user", {
      data: { email },
    });
    return response.data;
  };
  

export const fetchMentors = async () => {
  try {
    const response = await axios.get("/reports/get-all-mentors-metadata");
    // console.log("Fetching mentors:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch mentors:", error);
    throw error;
  }
};

export const fetchMentorOverview = async (mentorId) => {
  try {
    const response = await axios.get(`/reports/mentor-overview/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch mentor overview for ID ${mentorId}:`, error);
    throw error;
  }
};

export const fetchMentorAverageRating = async (mentorId) => {
  try {
    const response = await axios.get(`/reports/average-mentor/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error(" Failed to fetch average rating:", error?.response?.data || error.message);
    throw error;
  }
};


