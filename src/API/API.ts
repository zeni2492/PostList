import { AxiosApi } from "../utils/AxiosApi.ts";

interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const getAllPosts = async (): Promise<IPost[]> => {
  try {
    const response = await AxiosApi.get('/posts');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getOnePost = async (id: number | string): Promise<IPost> => {
  try {
    const response = await AxiosApi.get(`/posts/${id}`);
    return response.data;
  }
  catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}