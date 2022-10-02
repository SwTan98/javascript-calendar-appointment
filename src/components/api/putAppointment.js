import axios from "./axios";

const getAppointments = async (id, data) => {
  try {
    const result = await axios.put(`/appointment/${id}`, data);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default getAppointments;
