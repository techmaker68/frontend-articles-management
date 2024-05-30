import apiService from "@/services/apiService";

export const getArticles = async () => {
  return await apiService.get("/article");
};

export const saveArticle = async (data) => {
  return await apiService.post("/article", data);
};

export const getArticle = async (id) => {
  return await apiService.get(`/article/${id}`, data);
};

export const updateArticle = async (id, data) => {
  return await apiService.put(`/article/${id}`, data);
};
export const deleteArticle = async (id) => {
  return await apiService.delete(`/article/${id}`);
};
