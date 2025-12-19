import API from "./axios";

export const login = (data) => API.post("/users/login", data);

export const register = (data) => API.post("/users/register", data);

export const logout = () => API.post("/users/logout");

export const currentUser = () => API.get("/users/current-user")