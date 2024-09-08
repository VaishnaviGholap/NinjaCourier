import axios from "axios";
import { FEEDBACK, FORGET_USER, GET_TRACK, ORDER_PLACE, OTP_FORGET, RESET_PASSWORD, USER_LOGIN, USER_SIGNUP } from "../Services/CustomerRoute";

const tkn = getToken();
export function UserLogin(userData){
    return(axios.post(USER_LOGIN,userData));
}

export function UserSignUp(userData){
    return(axios.post(USER_SIGNUP,userData));
}

export function OrderPlace(orderData){
    return(axios.post(ORDER_PLACE,orderData, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function PostFeed(orderData){
    return(axios.post(FEEDBACK,orderData, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function Tracking(trk){
    return(axios.get(`${GET_TRACK}/${trk}`, {headers:{"Authorization": `Bearer ${getToken()}`}}));
}

export function UserForget(username){
    return(axios.get(`${FORGET_USER}/${username}`));
}

export function OTPUser(username,otp){
    return(axios.post(`${OTP_FORGET}/${username}`,otp));
}

export function RestPass(username,pas){
    return(axios.post(`${RESET_PASSWORD}/${username}`,pas));
}


export function storeToken(token){
    localStorage.setItem('token',token);
}

export function getToken(token){

    return(
        localStorage.getItem('token',token)
    );
}

export function removeToken(token){
    localStorage.removeItem('token',token);
}