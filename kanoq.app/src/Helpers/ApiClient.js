import axios from "axios";

export const baseURL = "http://localhost/Kanoq.Api";

export const uri = {
  client: {
    getAll: "client/get",
    insert: "Client/insert",
  },
};

const ApiClient = axios.create({ baseURL });

export default ApiClient;
