import axios from "axios";

const BASE_URL = "http://localhost:3001/persons"

const initData = () => {
    return axios.get(BASE_URL).then((response) => response.data)
}

const add = (phoneObject) => {
    return axios.post(BASE_URL, phoneObject).then(response => response.data)
}

const deleteItem = (id) => {
    return axios.delete(`${BASE_URL}/${id}`).then(response => response.data)
}

const update = (updatedItem) => {
    return axios.put(`${BASE_URL}/${updatedItem.id}`, updatedItem).then(response => response.data)
}

export default {initData, add, deleteItem, update}