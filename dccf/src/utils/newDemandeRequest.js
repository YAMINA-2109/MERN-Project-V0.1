import axios from "axios";

const newDemandeRequest = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
});

export default newDemandeRequest;