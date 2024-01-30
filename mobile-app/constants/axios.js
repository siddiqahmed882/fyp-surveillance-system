import axios from "axios";
import { getURL } from "../utils";
const axiosInstance = axios.create({
	baseURL: `${getURL("baseURL")}`,
});

export default axiosInstance;
