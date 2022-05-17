import api from "../../services/api/axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const setUserPreferredWorkHour = async (hour, id: number) => {
  try {
    const { data } = await api.put(`/users/${id}`, {
      preferredWorkingHourPerDay: hour,
    });

    toast.success("User work hours setting updated");

    return false;
  } catch (err: any) {
    toast.error(`Failed to update work hour setting`);
    toast.error(`${err?.message?.toLowerCase()}`);
    return !!err;
  }
};

export const fetchUserProfile = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}?populate=role`);

    return data;
  } catch (err: any) {
    toast.error(`Failed to fetch user profile`);
    return null;
  }
};

export const updateUserProfile = async (record, id: number) => {
  try {
    const { data } = await api.put(`/users/${id}`, record);

    // console.log(data);
    toast.success("User details: updated successfully");

    return false;
  } catch (err: any) {
    toast.error(`Failed to update your profile details`);
    toast.error(`${err?.message?.toLowerCase()}`);
    return !!err;
  }
};
