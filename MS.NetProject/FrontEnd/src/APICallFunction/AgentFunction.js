import axios from "axios";

import { DELETE_AGENT_ORDER, FORGET_AGENTS, GET_AGENT_ORDER, GET_AGENTS, LOGIN_AGEN, OTP_AGENTS, SIGNUP_AGENT } from "../Services/AgentRoute";
import { USER_SIGNUP } from "../Services/CustomerRoute";
import { getToken } from "./UserFunction";

const tkn = getToken();

export function GetAgent(){
    
    return(axios.get(GET_AGENTS, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function GetSingle(id){
    console.log(getToken());
    console.log(tkn);
    return(axios.get(`${GET_AGENTS}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function LoginAgent(data){
    return (axios.post(LOGIN_AGEN ,data));
}

export function SignAgent(data){
    return (axios.post(SIGNUP_AGENT,data));
}

export function GetSingleOrder(id){
    return(axios.get(`${GET_AGENT_ORDER}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function DeleteSingleOrder(id){
    return(axios.delete(`${DELETE_AGENT_ORDER}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function GetSingleUser(id){
    return(axios.get(`${USER_SIGNUP}/${id}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function AgentForget(username){
    return(axios.get(`${FORGET_AGENTS}/${username}`));
}

export function AgentOtp1(username,otp){
    return(axios.post(`${OTP_AGENTS}/${username}`,otp));
}