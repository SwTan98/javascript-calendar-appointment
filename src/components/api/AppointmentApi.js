import axios from "./axios";

export const getAppointments = async () => {
  try {
    const result = await axios.get("/appointment");
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getAppointment = async (id) => {
  try {
    const result = await axios.get(`/appointment/${id}`);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const postAppointment = async (data) => {
  try {
    const result = await axios.post("/appointment", data);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const putAppointment = async (id, data) => {
  try {
    const result = await axios.put(`/appointment/${id}`, data);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const result = await axios.delete(`/appointment/${id}`);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  getAppointments,
  getAppointment,
  postAppointment,
  putAppointment,
  deleteAppointment,
};
