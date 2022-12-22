import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password, roleId: '3'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const loginFunc = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const getUser = async (id) => {
    const {data} = await $host.get('api/user', {params: {id}})
    return data
}
export const createInformation = async (id, firstName, secondName, lastName, phoneNumber) => {
    const {data} = await $host.put('api/user/addInfo', {id, firstName, secondName, lastName, phoneNumber})
    return data
}