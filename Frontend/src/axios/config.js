import axios from "axios";

const blogFetch = axios.create({
  baseURL: "http://localhost:8090/api/v1",
});

export default blogFetch;
