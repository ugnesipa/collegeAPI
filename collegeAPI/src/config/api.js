// Importing necessary modules and components
import axios from "axios";

//exporting the deful path of API endpoint
export default axios.create({
  baseURL: "https://college-api.vercel.app/api"
});
