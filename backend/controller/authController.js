
import { registerUser, loginUser } from "../services/authService.js";
import { loginUserValidation, registerUserValidation } from "../validations/userValidation.js";
import jwt from "jsonwebtoken";

export const createAdminController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const isValidated = await registerUserValidation(req.body);

    if (!isValidated.status) {
      return res.status(400).json({
        status: false,
        message: isValidated.message,
      });
    }

    const admin = await registerUser({
      name,
      email,
      password,
      confirmPassword
    });

    res.status(201).json({
      message: "Admin user created successfully",
      status: true,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log({email})
    const isValidated = await loginUserValidation(req.body);
    if (!isValidated.status) {
      return res.status(400).json({
        status: false,
        message: isValidated.message,
      });
    }

    const user = await loginUser({ email, password });

    // 🔥 Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "my_secret_key", // use env in real apps
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: true,
      message: "User login successful",
      token, // ✅ SEND TOKEN
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
