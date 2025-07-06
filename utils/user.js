import { BASE_URL } from "./constants";

const getCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/api/profile/view`, {
    credentials: "include",
  });
  const result = response.json();
  return result;
};

export default getCurrentUser;
