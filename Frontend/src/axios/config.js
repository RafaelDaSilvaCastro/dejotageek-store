import axios from "axios";

const blogFetch = axios.create({
  baseURL: "http://localhost:3000",
});

export default blogFetch;
