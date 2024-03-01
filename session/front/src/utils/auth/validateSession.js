"use server";

import { get } from "../api/api";
import { cookies } from "next/headers";

const validateSession = async () => {
    try {
        // verify the session
        let response = await get(`/auth/verify-session`);

        // if the session is not valid, try refresh the session
        if (!response.success) {
            const cookie = cookies();
            const refreshToken = cookie.get("refreshToken")?.value;

            const headers = refreshToken ? { "x-refresh-token": refreshToken } : {};

            response = await get(`/auth/refresh-session`, { headers });

            if (response.success) {
                const { accessCookie } = response.cookies;
                const { refreshCookie } = response.cookies;

                response.cookies = {
                    accessCookie: {
                        name: "accessToken",
                        value: accessCookie.value,
                        maxAge: accessCookie.maxAge,
                        path: "/",
                        httpOnly: true,
                        sameSite: "lax",
                        // secure: true,
                    },
                    refreshCookie: {
                        name: "refreshToken",
                        value: refreshCookie.value,
                        maxAge: refreshCookie.maxAge,
                        path: "/",
                        httpOnly: true,
                        sameSite: "lax",
                        // secure: true,
                    },
                };
            }
        }

        return response;
    } catch (error) {
        return { success: false };
    }
};

export default validateSession;
