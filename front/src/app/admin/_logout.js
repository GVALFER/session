"use client";

import destroySession from "../../utils/auth/destroySession";

const Logout = () => {
    return <button onClick={() => destroySession()}>Logout</button>;
};

export default Logout;
