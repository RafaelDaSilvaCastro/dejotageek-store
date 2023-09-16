import axios from "axios";

const blogFetch = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  }
});

export default blogFetch