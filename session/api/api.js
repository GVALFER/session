const express = require("express");
const server = express();
const dotenv = require("dotenv");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
dotenv.config();

const adminRoute = require("./routes/admin");
const loginRoute = require("./routes/login");
const getSession = require("./routes/auth/get-session");
const refreshSession = require("./routes/auth/refresh-session");
const verifySession = require("./routes/auth/verify-session");
const getUsers = require("./routes/users");

// Routes
server.use("/admin", adminRoute);
server.use("/login", loginRoute);
server.use("/auth/get-session", getSession);
server.use("/auth/refresh-session", refreshSession);
server.use("/auth/verify-session", verifySession);
server.use("/users", getUsers);

// Catch-all for undefined routes
server.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

server.listen(4000, () => {
    console.log(`Server listening on port 4000`);
});
