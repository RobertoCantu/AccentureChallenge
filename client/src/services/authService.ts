// utils
import axios from "../utils/axios";

export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    return {
        Authorization: 'Bearer' + token,
        'x-access-token': token,
    };
};

export async function login(email: string, password: string) {
	return new Promise(async (resolve, reject) => {
		const url = "/api/v1/user/login";

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
	lastName: string,
	password: string
) {
	return new Promise(async (resolve, reject) => {
		const url = "/api/v1/user/signup";

		try {
			const response = await axios.post(url, {
				email,
				firstName,
				lastName,
				password,
			});

			resolve(response.data);
		} catch (err) {
			reject(err);
		}
	});
}
