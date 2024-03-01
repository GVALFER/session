"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const destroySession = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return redirect("/auth");
};

export default destroySession;
