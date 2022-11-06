import axios from "axios";

const VERIFICATION_SERVER = "http://localhost:8080/api";

export const getQRCode = async () => {
  try {
    const response = await axios.get(`${VERIFICATION_SERVER}/sign-in`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
