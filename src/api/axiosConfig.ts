import { env } from "@/config/var";
import axios from "axios";

const baseURL = env.API_HOST;

export const api = axios.create({
  baseURL: baseURL
});
