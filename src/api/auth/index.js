import apiService from "@/services/apiService";

export const login = async (data) => {
  return await apiService.post("/login", data);
};

export const register = async (data) => {
  return await apiService.post("/register", data);
};
