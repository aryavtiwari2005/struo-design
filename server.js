const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Suppress BrokenPipeError for stdout and stderr
process.stdout.on("error", (err) => {
    if (err.code === "EPIPE") {
        return; // Silently ignore BrokenPipeError
    }
    console.error("stdout error:", err);
});

process.stderr.on("error", (err) => {
    if (err.code === "EPIPE") {
        return; // Silently ignore BrokenPipeError
    }
    console.error("stderr error:", err);
});

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0"; // Listen on all interfaces
const port = process.env.PORT || 3000; // Use cPanel-assigned port

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        // Handle client connection errors to prevent crashes
        res.on("error", (err) => {
            if (err.code === "EPIPE" || err.code === "ECONNRESET") {
                return; // Ignore client disconnect errors
            }
            console.error("Response error:", err);
        });

        try {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl).catch((err) => {
                console.error("Error handling request:", req.url, err);
                if (!res.headersSent && !res.finished) {
                    res.statusCode = 500;
                    res.end("Internal server error");
                }
            });
        } catch (err) {
            console.error("Error occurred:", err);
            if (!res.headersSent && !res.finished) {
                res.statusCode = 500;
                res.end("Internal server error");
            }
        }
    });

    // Handle server-level errors
    server.on("error", (err) => {
        if (err.code === "EPIPE" || err.code === "ECONNRESET") {
            return; // Ignore pipe or connection reset errors
        }
        console.error("Server error:", err);
    });

    server.listen(port, (err) => {
        if (err) {
            console.error("Failed to start server:", err);
            process.exit(1);
        }
        console.log(`> Ready on http://${hostname}:${port}`);
    });
}).catch((err) => {
    console.error("Failed to prepare app:", err);
    process.exit(1);
});