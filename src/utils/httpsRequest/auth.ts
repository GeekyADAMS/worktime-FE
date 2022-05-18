import api from "../../services/api/axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const registerUser = async (details) => {
  try {
    const data = await api.post("/auth/local/register", details);

    toast.success(`User (${details.username}) registered successfully`);

    return false;
  } catch (err: any) {
    toast.error(`${err?.message?.toLowerCase()}`);
    return true;
  }
};

export const loginUser = async (details) => {
  try {
    const data = await api.post("/auth/local", details);

    toast.success(`Login successful`);
    // console.log("Login response: ", data.data);

    return data.data;
  } catch (err: any) {
    toast.error(`Login error: ${err?.message?.toLowerCase()}`);
    return null;
  }
};
