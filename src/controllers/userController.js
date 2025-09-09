import { 
  registerUserService, 
  loginUserService, 
  getProfileService, 
  resetPassword, 
  requestPasswordReset, 
  updateProfileService
} from "../services/userService.js";

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
    res.status(400).json({ msg: err.message });
    console.log(err)
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err)
  }
};

// Solicitar enlace de recuperacion
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await requestPasswordReset(email);
    res.status(200).json({ msg: data.message });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Resetear la contraseña
export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const data = await resetPassword(token, newPassword);
    res.status(200).json({ msg: data.message });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Perfil
export const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const avatarUrl = req.file ? req.file.path : undefined;

    const updatedUser = await updateProfileService(userId, {
      name: req.body.name,
      email: req.body.email,
      avatar: avatarUrl
    });

    res.status(200).json({ msg: "User update successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(err)
  }
};

// Salir
export const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ msg: "Logged out" });
};
