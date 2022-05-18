import api from "../../services/api/axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const fetchAllUsers = async () => {
  try {
    const { data } = await api.get(
      `/users??sort[0]=createdAt%3Adesc&populate=role`
    );

    return data;
  } catch (err: any) {
    // toast.error("Failed to fetch all users");
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/users/${id}`);

    toast.success(`User (id: ${id}) deleted successfully`);
    return false;
  } catch (err: any) {
    toast.error(`Unable to delete selected user`);
    toast.error(`${err?.message?.toLowerCase()}`);
    return !!err;
  }
};
