import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const apiCode = process.env.NEXT_PUBLIC_API_CODE;

// controlled
const client = axios.create({
  baseURL: baseURL,
  headers: {
    "x-api-key": apiCode,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// controlled
export const simpleAxiosApi = ({ ...options }) => {
  // client.defaults.headers.common["x-api-key"] = apiCode;
  // client.defaults.headers.common.Accept = "application/json";
  //   client.defaults.headers.common["Content-Type"] = "application/json";
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log(error);
    // optionaly catch errors and add additional logging here
    return error;
  };

  return client(options).then(onSuccess);
};
