import {AxiosApi} from "../utils/AxiosApi.ts";

const getAllPosts = async () => {
  const data = await AxiosApi.get('/posts');
  return data.data
}

export {
  getAllPosts,
}