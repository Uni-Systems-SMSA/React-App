import axios from "axios";

const axiosCicicom = axios.create({
  baseURL: "http://dev.smartgridnet.com/SmartGridPortalDev",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosLocalhost = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosCicicom, axiosLocalhost };
