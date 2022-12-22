import {$authHost, $host} from "./index";
import "../components/modals/createProduct";

export const createProduct = async (title, price, information, genuId, userId) => {
    const {data} = await $authHost.post('api/product', {title, price, information, genuId, userId})
    return data
}
export const receiveProducts = async (genuId) => {
    const {data} = await $host.get('api/product', {params: {
            genuId
        }})
    return data
}
export const receiveOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}
export const getGenus = async () => {
    const {data} = await $host.get('api/genus')
    return data
}