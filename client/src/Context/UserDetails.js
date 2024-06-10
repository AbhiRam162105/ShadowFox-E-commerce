import axios from "axios";

/**
 * Fetches user details by validating the token stored in local storage.
 * @returns {Promise<Object>} A promise that resolves with the user details.
 */
export const getUserDetails = async () => {
  // Check if a token exists in local storage
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in local storage.");
    return null;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      "http://localhost:4000/api/users/validate",
      {},
      config
    );
    console.log("====================================");
    console.log("response", response.data.user);
    console.log("====================================");
    return response.data.user; // Assuming the response contains the user details
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return null;
  }
};
