import axios from "axios";

const baseURL = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;

console.log(baseURL);

const instance = axios.create({ baseURL });

export default instance;
