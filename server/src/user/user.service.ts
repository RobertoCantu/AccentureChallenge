import { User } from '@prisma/client';
import { db } from "../utils/db.server";

export const createUser = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string
): Promise<User> => {
    const createdUser = await db.user.create({
        data: {
            email,
            firstName,
            lastName,
            password
        },
    });

    return createdUser;
};

export const getUser = async (email: string): Promise<User | null> => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });

    return user;
};