import { db } from "../utils/db.server";

type User = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
};

export const signup = async (user: Omit<User, "id">): Promise<User> => {
    const {email, firstName, lastName, password} = user;
    return db.user.create({
        data: {
            email,
            firstName,
            lastName,
            password
        }
    })
};

