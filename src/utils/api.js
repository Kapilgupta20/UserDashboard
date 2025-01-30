const BASE_URL = "https://my-json-server.typicode.com/Kapilgupta20/jsonserver/users";

//Fetch all users
export const getUsers = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

//Add a new user
export const addUser = async (userData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Failed to add user");
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

//Update a user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    return null;
  }
};

//Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete user");
    return true; // Indicating success
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    return false;
  }
};
