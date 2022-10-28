import axios from "axios";

export const API = axios.create({
  baseURL: "https://ulematic-live-api.herokuapp.com/",
});
