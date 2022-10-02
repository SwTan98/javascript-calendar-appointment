import axios from "./axios";

const getAppointment = async (id) => {
  try {
    const result = await axios.get(`/appointment/${id}`);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default getAppointment;
