import axios from "axios";
import { Response } from "./types";

const instance = axios.create();

export const handleError = (error: any): Response => {
  const { response, message } = error;

  if (response) {
    const { data, status } = response;

    if (status !== 500) {
      return data;
    } else {
      return { message };
    }
  } else {
    return { message };
  }
};

export default instance;
