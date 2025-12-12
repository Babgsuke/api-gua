const express = require("express");
const app = express();

app.use(express.json());

// === WHITELIST IP MIDDLEWARE ===
const WHITELIST_IP = ["127.0.0.1", "YOUR.PUBLIC.IP"];

app.use((req, res, next) => {
	let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	// hapus prefix IPv6 (::ffff:)
	ip = ip.replace("::ffff:", "");

	if (!WHITELIST_IP.includes(ip)) {
		return res.status(403).json({
			success: false,
			message: "IP not allowed",
			ip
		});
	}

	next();
});

const vmessRoutes = require("./Router/vmessRouter.js");
const sshRoutes = require("./Router/SshRouter.js");
const vlessRoutes = require("./Router/Vlessrouter.js");
const troRoutes = require("./Router/TroRouter.js");

app.use("/api", vmessRoutes);
app.use("/api", sshRoutes);
app.use("/api", vlessRoutes);
app.use("/api", troRoutes);

app.listen(3000, () => {
  console.log("✅ API running on port 3000");
});