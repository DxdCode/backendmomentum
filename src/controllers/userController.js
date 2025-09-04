import { registerUserService, loginUserService, getProfileService } from "../services/userService.js";

// Registro
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const { user, token } = await registerUserService({ name, email, password, avatar });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Perfil
export const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.userId);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({ message: "Logged out" });
};
