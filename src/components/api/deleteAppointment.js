import axios from "./axios";

const deleteAppointment = async (id) => {
  try {
    const result = await axios.delete(`/appointment/${id}`);
    return result.data.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default deleteAppointment;
