const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const JWT_EXPIRES = 60 * 5; // 5 minutes
const JWT_REFRESH_EXPIRES = 900 * 60 * 60; // 30 days
const SECRET = process.env.JWT_SECRET; // Secret for JWT

// Verify access token
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
};

// Calculate max age
const calculateMaxAge = (exp) => {
    const now = dayjs().unix();
    const maxAge = now + exp;
    return maxAge;
};

// Generate access token
const generateAccessToken = async ({ payload }) => {
    const token = jwt.sign(payload, SECRET, { expiresIn: JWT_EXPIRES });
    const maxAge = JWT_EXPIRES;

    return { token, maxAge };
};

// Generate refresh token
const generateRefreshToken = async ({ tokenId, userId }) => {
    try {
        // If the user has a refresh token, delete it
        // if (tokenId) {
        //     await prisma.sessions.delete({ where: { id: tokenId } });
        // }

        // // If the user is an admin, add the adminId to the data
        // const createToken = await prisma.sessions.create({
        //     data: {
        //         id: uuid(),
        //         expires: calculateMaxAge(JWT_REFRESH_EXPIRES),
        //         userId: userId,
        //     },
        // });

        // const token = createToken.id;

        // SWAP THIS WITH A DATABASE QUERY TO ROTATE THE REFRESH TOKENS
        const token = "replace-with-db-token-id";
        const maxAge = JWT_REFRESH_EXPIRES;

        return { token, maxAge };
    } catch (err) {
        console.error(err);
    }
};

// Auth protect middleware
const authProtect = () => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized!",
            });
        }

        const accessToken = authHeader.split(" ")[1];

        if (!accessToken) {
            return res.json({
                success: false,
                message: "Unauthorized!",
            });
        }

        // Verify the accessToken
        jwt.verify(accessToken, SECRET, (err, decoded) => {
            if (!err && decoded) {
                req.user = {
                    id: decoded.id,
                    email: decoded.email,
                };

                next();
            } else {
                return res.json({
                    success: false,
                    message: "Unauthorized!",
                });
            }
        });
    };
};

module.exports = {
    verifyToken,
    generateAccessToken,
    generateRefreshToken,
    authProtect,
};
