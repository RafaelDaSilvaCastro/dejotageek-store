import axios from "axios";

const blogFetch = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default blogFetch;
