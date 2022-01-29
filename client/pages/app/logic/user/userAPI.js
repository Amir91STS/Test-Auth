import axios from "axios";

export async function loginUser(values) {
  try {
    const response = await axios.post(`/auth/login`, values);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function verifyOtp(values) {
  try {
    const response = await axios.post(`/auth/otp`, values);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getProfile() {
  try {
    const response = await axios.get(`/user/profile`);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}
