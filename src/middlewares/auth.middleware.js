import { verifyToken } from "../utils/jwt.js";
import UserRepository from "../repositories/UserRepository.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("No autorizado, token no encontrado");

        const decoded = verifyToken(token);
        const user = await UserRepository.findById(decoded.id);

        if (!user) throw new Error("Usuario no encontrado");

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
