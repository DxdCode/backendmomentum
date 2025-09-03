import UserService from "../services/UserService.js";

class UserController {
    async register(req, res) {
        try {
            const user = await UserService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await UserService.login(email, password);

            res.cookie("session", token, {
                httpOnly: true,    
                secure: true,
                sameSite: "strict", 
                maxAge: 24 * 60 * 60 * 1000 
            });

            res.json({ user, message: "Login exitoso" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await UserService.getProfile(req.user.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const user = await UserService.updateProfile(req.user.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();
