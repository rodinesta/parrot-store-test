import {$authHost, $host} from "./index";
import "../components/modals/createProduct";

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}
export const receiveProducts = async (genuId, userId) => {
    const {data} = await $host.get('api/product', {params: {
            genuId, userId
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

export const deleteProduct = async (id) => {
    const {data} = await $host.delete('api/product/' + id)
    return data
}