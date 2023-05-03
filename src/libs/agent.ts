import axios from "axios";
import { OMDB_URL } from "../constants";

const instance = axios.create({
    baseURL: OMDB_URL,
});


export default instance;