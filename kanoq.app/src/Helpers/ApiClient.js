import axios from "axios";

export const baseURL = "http://localhost/Kanoq.Api";

export const uri = {
  client: {
    getAll: "client/get",
    insert: "client/insert",
    update: "client/update",
  },
};

const ApiClient = axios.create({ baseURL });

export default ApiClient;
