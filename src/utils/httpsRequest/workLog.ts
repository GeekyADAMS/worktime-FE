import api from "../../services/api/axios";
import { flattenNonDupObj } from "../helpers/tools";
import { useToast } from "vue-toastification";

const toast = useToast();

export const createWorkLog = async (record) => {
  try {
    const { data } = await api.post("/work-logs", {
      data: record,
    });

    // console.log(data);
    toast.success("Work item: created successfully");

    return false;
  } catch (err: any) {
    toast.error(`Work item: ${err?.message?.toLowerCase()}`);
    return !!err;
  }
};

export const updateWorkLog = async (record, id: number) => {
  try {
    const { data } = await api.put(`/work-logs/${id}`, {
      data: record,
    });

    // console.log(data);
    toast.success("Work item: updated successfully");

    return false;
  } catch (err: any) {
    toast.error(`Failed to update work item with id: ${id}`);
    toast.error(`${err?.message?.toLowerCase()}`);
    return !!err;
  }
};

export const fetchUserWorkLogs = async (id) => {
  try {
    const { data } = await api.get(
      `/work-logs?populate=users_permissions_user&filters[users_permissions_user][id][$eq]=${id}`
    );

    const record: any[] = [];

    for (let i = 0; i < data?.data?.length; i++) {
      const item = flattenNonDupObj(data.data[i]);

      record.push(item);
    }

    const pageData = data.meta;

    return { record, pageData };
  } catch (err: any) {
    return { record: null, pageData: null };
  }
};

export const deleteWorkLog = async (id) => {
  try {
    const { data } = await api.delete(`/work-logs/${id}`);

    toast.success("Work item: deleted successfully");
    return false;
  } catch (err: any) {
    toast.error(`Work item: ${err?.message?.toLowerCase()}`);
    return !!err;
  }
};
