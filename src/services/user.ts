import { prismaClient } from "../lib/db.js";
import { createHmac, randomBytes } from 'node:crypto';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
}

export interface GetUserToken {
    email: string,
    password: string
}

class UserService {
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = createHmac('sha256', salt).update(password).digest("hex");
        return prismaClient.user.create({
            data: {
                firstName,
                lastName: lastName ?? null,
                email,
                password: hashedPassword,
                salt,
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } });
    }
    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    public static async getUserToken(payload: GetUserToken) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error('User not found!!!');

        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt, password);

        if (userHashPassword !== user.password) throw new Error('Incorrect password!!');
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return JWT.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            {
                expiresIn: "7d",
                algorithm: "HS256",
            }
        );

    }
}

export default UserService;