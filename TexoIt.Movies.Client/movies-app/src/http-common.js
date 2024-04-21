import axios from "axios";

export default axios.create({
  baseURL: "https://tools.texoit.com/backend-java/api/movies",
  headers: {
    "Content-type": "application/json"
  }
});