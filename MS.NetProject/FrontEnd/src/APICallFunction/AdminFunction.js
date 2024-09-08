import axios from "axios";
import { DELETE_AGENTS, DELETE_ORDERS, DELETE_QUERY,DELETE_USER,GET_AGENTS,GET_ORDERS,GET_USERS, LOGIN_AGENTS, QUERIES_AGENTS, UPDATE_USER } from "../Services/AdminRoute";
import { getToken } from "./UserFunction";

const tkn = getToken();
export function AdminLogin(userData){
    return(axios.post(LOGIN_AGENTS,userData));
}

export function AdminQuery(){
    return(axios.get(QUERIES_AGENTS, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function DeleteQuery(id){
    return(axios.delete(`${DELETE_QUERY}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function getUsers(){
    return(axios.get(GET_USERS, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function deleteUser(id){
    console.log(getToken());
    
    return(axios.delete(`${DELETE_USER}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function UpdateUser(id,data){
    return(axios.post(`${UPDATE_USER}/${id}`, data, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function getOrders(){
    return(axios.get(GET_ORDERS, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function deleteOrder(id){
    return(axios.delete(`${DELETE_ORDERS}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function getSingleOrder(id){
    return(axios.get(`${GET_ORDERS}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function updateSingleOrder(id,data){
    return(axios.post(`${GET_ORDERS}/${id}`,data, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function getAgents(){
    return(axios.get(GET_AGENTS, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function deleteAgent(id){
    return(axios.delete(`${DELETE_AGENTS}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}



