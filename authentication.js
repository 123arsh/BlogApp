const jwt = require("jsonwebtoken");

const secret = "@@AD,DEEP73031-78879889CRUSH=KARINA_SHARMA,BUTNOWIMOVEDONFROMHERE&$%98";

// Generate Token
function createTokenforUser(user) {
    if (!user || !user._id) {
        console.error("Error: User object is missing or has no valid ID");
        return null;
    }

    const payload = {
        _id: user._id.toString(),
        fullName: user.fullName || "",
        gender: user.gender || "",
        profileImageURL: user.profileImageURL || "",
        role: user.role || "user",
    };

    try {
        return jwt.sign(payload, secret, { expiresIn: "1h" });
    } catch (error) {
        console.error("Error generating token:", error.message);
        return null;
    }
}

// Validate Token
function validateToken(token) {
    try {
        if (!token) throw new Error("Token is missing");
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
}

module.exports = {
    createTokenforUser,
    validateToken,
};
