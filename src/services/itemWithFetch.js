export function getItems() {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_API_END_POINT}api/todo`)
			.then(response => response.json())
			.then(data => {
				resolve({ data });
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function getItem(id) {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_API_END_POINT}api/todo/${id}`)
			.then(response => response.json())
			.then(data => {
				resolve({ data });
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function deleteItem(id) {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_API_END_POINT}api/todo/${id}`, {
			method: "DELETE"
		})
			.then(response => response.json())
			.then(data => {
				resolve({ data });
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function updateItemStatus(id, payload) {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_API_END_POINT}api/todo/${id}/status`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				resolve({ data });
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function updateItem(id, payload) {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_API_END_POINT}api/todo/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				resolve({ data });
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function createItem(payload) {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_API_END_POINT}api/todo/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				resolve({ data });
			})
			.catch(error => {
				reject(error);
			});
	});
}
