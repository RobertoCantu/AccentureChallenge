// utils
import axios from "../utils/axios";

export async function login(email: string, password: string) {
	return new Promise(async (resolve, reject) => {
		const url = "/api/v1/auth/login";

		try {
			const response = await axios.post(url, {
				email,
				password,
			});
			resolve(response.data);
		} catch (err) {
			reject(err);
		}
	});
}

export async function register(
	email: string,
	firstName: string,
	lastname: string,
	password: string
) {
	return new Promise(async (resolve, reject) => {
		const url = "/auth/signup";

		try {
			const response = await axios.post(url, {
				email,
				firstName,
				lastname,
				password,
			});

			resolve(response.data);
		} catch (err) {
			reject(err);
		}
	});
}
