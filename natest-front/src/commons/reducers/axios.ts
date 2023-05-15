import { backUrl } from "../../../config/config";
import axios from "axios";

export const api = axios.create({
  baseURL: backUrl,
  withCredentials: true,
});
