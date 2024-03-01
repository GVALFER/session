"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import setSession from "../../utils/auth/setSession";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const session = await setSession({ email, password });

        if (!session.success) {
            setErrors(session.message);
            return;
        }

        if (!session.success) return;
        router.push("/admin");
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
                {errors && <div>{errors}</div>}
            </form>
        </div>
    );
};

export default Login;
