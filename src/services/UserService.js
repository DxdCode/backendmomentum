import UserRepository from "../repositories/UserRepository.js";
import { generateToken } from "../utils/jwt.js";

class UserService {
    async register(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) throw new Error('Email already in use');

        const user = await UserRepository.createUser(userData);
        return user;
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) throw new Error('Invalid email or password');

        const token = generateToken(user.id);

        const userData = user.toJSON();

        return { user: userData, token };
    }

    async getProfile(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) throw new Error("User not found");
        return user.toJSON();
    }

    async updateProfile(userId, updateData) {
        const user = await UserRepository.updateUser(userId, updateData);
        return user.toJSON();
    }


}

export default new UserService();
