import { request } from "../setupAxios.js";

import axios from "axios";

export function getItems() {
	return new Promise((resolve, reject) => {
		axios
			.get("/api/todo")
			.then(res => {
				resolve(res);
			})
			.catch(error => {
				reject(error);
			});
	});

	// return request("/api/todo", "GET");
}

export function getItem(id) {
	return request(`/api/todo/${id}`, "GET");
}

export function deleteItem(id) {
	return new Promise((resolve, reject) => {
		axios
			.delete(`/api/todo/${id}`)
			.then(res => {
				resolve(res);
			})
			.catch(error => {
				reject(error);
			});
	});
	// return request(`/api/todo/${id}`, "DELETE");
}

export function updateItemStatus(id, payload) {
	return request(`/api/todo/${id}/status`, "PATCH", payload);
}

export function updateItem(id, payload) {
	return request(`/api/todo/${id}`, "PUT", payload);
}

export function createItem(payload) {
	return new Promise((resolve, reject) => {
		axios
			.post(`/api/todo`, payload)
			.then(res => {
				resolve(res);
			})
			.catch(error => {
				reject(error);
			});
	});
	// return request(`/api/todo`, "POST", payload);
}
