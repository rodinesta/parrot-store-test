import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._genus = []
        this._products = []
        this._selectedGenus = {}
        makeAutoObservable(this)
    }

    setGenus(genus) {
        this._genus = genus
    }
    setProducts(product) {
        this._products = product
    }
    setSelectedGenus(genus) {
        this._selectedGenus = genus
    }

    get genus() {
        return this._genus
    }
    get products() {
        return this._products
    }
    get selectedGenus() {
        return this._selectedGenus
    }
}