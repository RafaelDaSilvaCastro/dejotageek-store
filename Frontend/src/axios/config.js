import axios from "axios";

const blogFetch = axios.create({
  baseURL: "http://localhost:8080"
});

export default blogFetch