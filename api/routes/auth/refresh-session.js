const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const { generateAccessToken, generateRefreshToken } = require("../../utils/auth");

// SWAP THIS DATA WITH A DATABASE QUERY
const USER = {
    id: 1,
    email: "test@demo.ltd",
    password: "123456",
};

router.get("/", async (req, res) => {
    const refreshToken = req.headers["x-refresh-token"];

    // if no refresh token is provided return false
    if (!refreshToken) {
        return res.json({
            success: false,
        });
    }

    try {
        // DB QUERY
        // const decoded = await prisma.sessions.findUnique({
        //     where: { id: refreshToken },
        //     select: {
        //         id: true,
        //         expires: true,
        //         user: {
        //             select: {
        //                 id: true,
        //                 email: true,
        //             },
        //         },
        //     },
        // });

        // if the token is not found in the db do not refresh the session
        // if (!decoded) {
        //     return res.json({ success: false });
        // }

        // SWAP THIS WITH THE DB SESSIONS DATA
        const decoded = {
            id: 1,
            expires: dayjs().add(1, "day").unix(),
            user: {
                id: USER.id,
                email: USER.email,
            },
        };

        // check if the token is expired
        const now = dayjs().unix();
        const isExpired = now > decoded.expires;

        // if the token is expired do not refresh the session
        if (isExpired) {
            return res.json({
                success: false,
            });
        }

        // If refresh token is valid create the payload
        const payload = {
            id: decoded.user.id,
            email: decoded.user.email,
        };

        // generate refresh tokens
        const refresh = await generateRefreshToken({
            tokenId: decoded.id,
            userId: decoded.user.id,
        });

        // generate access token
        const access = await generateAccessToken({ payload: payload });

        // send the cookies to the client
        const cookies = {
            accessCookie: {
                value: access.token,
                maxAge: access.maxAge,
            },
            refreshCookie: {
                value: refresh.token,
                maxAge: refresh.maxAge,
            },
        };

        return res.json({
            success: true,
            cookies,
        });
    } catch (err) {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
