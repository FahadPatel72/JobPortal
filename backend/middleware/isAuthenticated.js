import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    //extract jwt token
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    //verify the token
    try {
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Token is not valid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Authentication Unsuccessfull",
    });
  }
};

export const isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Students",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid user found on this route",
    });
  }
};

export const isRecruiter = async (req, res, next) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Recruiters",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid admin found on this route",
    });
  }
};