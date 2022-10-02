import axios from "./axios";

const getAppointments = async () => {
  try {
    const result = await axios.get("/appointment");
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default getAppointments;
