import axios from "axios";

if(process.env.NODE_ENV === "development") {
    console.log('We are in development mode!');
}

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default axios;