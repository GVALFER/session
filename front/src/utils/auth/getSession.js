"use server";

import { get } from "../api/api";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

/**
 * @description Get the session data from db
 * @example
 * import { getSession } from "@/session";
 * const session = await getSession();
 */

const getSession = async () => {
    const response = await get(`/auth/get-session`);

    if (!response.success) return;

    return response;
};

/**
 * @description Get the session data from cookie
 * @example
 * import { getLocalSession } from "@/session";
 * const session = await getLocalSession();
 */
const getLocalSession = async () => {
    const cookie = cookies();
    const token = cookie.get("accessToken")?.value;

    if (!token) return;

    try {
        const decoded = decodeJwt(token);
        return {
            user: {
                id: decoded.id,
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
            },
        };
    } catch (err) {
        return;
    }
};

export { getSession, getLocalSession };
