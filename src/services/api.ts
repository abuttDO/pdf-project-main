import axios from "axios";

const api = (header?: any) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...header,
  };

  return axios.create({
    baseURL: "https://v1.utalk.chat/send",
    headers,
  });
};

export default api;
