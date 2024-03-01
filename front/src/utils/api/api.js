"use server";

import { cookies } from "next/headers";

const API = "http://127.0.0.1:4000";

// fetcher function
const fetcher = async (url, options) => {
    try {
        const response = await fetch(`${API}${url}`, options);

        const responseData = await response.json();
        const responseStatus = response.status;

        return {
            ...responseData,
            statusCode: responseStatus,
        };
    } catch (error) {
        return {
            statusCode: 500,
            error: error.message,
        };
    }
};

// getHeaders function
const getHeaders = () => {
    const cookie = cookies();
    const accessToken = cookie.get("accessToken")?.value;

    const commonHeaders = {
        /** Other headers */
    };

    return {
        Authorization: `Bearer ${accessToken}`,
        ...commonHeaders,
    };
};

// GET method
// eg: const users = await get("/api/users");
const get = async (url, config = {}) => {
    const headers = getHeaders();

    const requestOptions = {
        method: "GET",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    const response = await fetcher(url, requestOptions);
    return response;
};

// POST method
// eg: const user = await post("/api/users", { name: "John Doe" });
const post = async (url, body, config = {}) => {
    const headers = getHeaders();

    const requestOptions = {
        method: "POST",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    if (config.type === "multipart/form-data") {
        requestOptions.body = body;
    } else {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetcher(url, requestOptions);
    return response;
};

// PUT method
// eg: const user = await put("/api/users/1", { name: "John Doe" });
const put = async (url, body, config = {}) => {
    const headers = getHeaders();

    const requestOptions = {
        method: "PUT",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    if (config.type === "multipart/form-data") {
        requestOptions.body = body;
    } else {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetcher(url, requestOptions);
    return response;
};

// DELETE method
// eg: const user = await remove("/api/users/1");
const remove = async (url, config = {}) => {
    const headers = getHeaders();

    const requestOptions = {
        method: "DELETE",
        cache: config.cache || "no-store",
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    const response = await fetcher(url, requestOptions);
    return response;
};

export { get, post, put, remove };
