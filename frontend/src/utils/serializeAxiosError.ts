import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export default function (error: AxiosError): SerializedError {

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return { message: error.message, code: `${error.response.status}` };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return { message: "Something went wrong" };
  }
  // Something happened in setting up the request that triggered an Error
  console.log("Error", error.message);
  return { message: error.message };

  
}
