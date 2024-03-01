"use server";

import { post } from "../api/api";
import { cookies } from "next/headers";

const setSession = async (request) => {
    const { email, password } = request;

    if (!email) {
        return {
            success: false,
            message: "No email provided.",
        };
    }

    if (!password) {
        return {
            success: false,
            message: "No code provided.",
        };
    }

    try {
        // get the session
        const response = await post(`/login`, { email, password });

        if (!response.success) {
            return {
                success: false,
                message: response.message,
            };
        }

        // if success is true, set the cookies
        if (response.success && response.cookies) {
            const { accessCookie } = response.cookies;
            const { refreshCookie } = response.cookies;

            cookies().set("accessToken", accessCookie.value, {
                maxAge: accessCookie.maxAge,
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                // secure: true, // set to true if using https
            });

            cookies().set("refreshToken", refreshCookie.value, {
                maxAge: refreshCookie.maxAge,
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                // secure: true, // set to true if using https
            });
        }

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        console.log(error);
    }
};

export default setSession;
