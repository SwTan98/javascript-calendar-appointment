import axios from "./axios";

const getAppointments = async (data) => {
  try {
    const result = await axios.post("/appointment", data);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default getAppointments;
