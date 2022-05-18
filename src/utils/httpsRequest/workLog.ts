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

export const fetchUserWorkLogs = async (id, filter) => {
  try {
    let dateFrom = "1800-01-01";
    let dateTo = new Date().toISOString().split("T")[0];

    if (filter) {
      dateFrom = filter.dateFrom || "1800-01-01";
      dateTo = filter.dateTo || new Date().toISOString().split("T")[0];
    }

    const { data } = await api.get(
      `/work-logs?sort[0]=createdAt%3Adesc&populate=users_permissions_user&filters[users_permissions_user][id][$eq]=${id}&filters[$and][0][date][$gte]=${dateFrom}&filters[$and][1][date][$lte]=${dateTo}`
    );

    const record: any[] = [];

    for (let i = 0; i < data?.data?.length; i++) {
      const item = flattenNonDupObj(data.data[i]);

      record.push(item);
    }

    const pageData = data.meta;

    return { record, pageData };
  } catch (err: any) {
    return { record: [], pageData: null };
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
