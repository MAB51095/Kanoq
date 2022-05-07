import axios from "axios";

const kanoqApiClient = axios.create({
  baseURL: process.env.REACT_APP_KANOQ_API_BASE_URL,
});

export const uri = {
  client: {
    getAll: "/Client/get",
    insert: "/Client/insert",
  },
};

export default kanoqApiClient;
