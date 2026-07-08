import axios from "axios"

const Api = axios.create({
    baseURL:"http://localhost:8000",
    withCredintials : true
});

export const registerUser = (userData)=>{ return Api.post("/user/register",userData)};
export const loginUser = (userData) => {
    return Api.post("/user/login", userData);
};

export { Api }