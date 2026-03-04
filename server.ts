import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging for debugging
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    }
    next();
  });

  // Lazy load database to prevent crash on startup in environments like Vercel
  let db: any;
  try {
    const Database = (await import("better-sqlite3")).default;
    const dbPath = path.resolve(__dirname, "detailers.db");
    db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        car_model TEXT,
        service TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        service TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log(`Database initialized at ${dbPath}`);
  } catch (error) {
    console.error("Database initialization failed (falling back to memory-only mode):", error);
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      database: !!db, 
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      dirname: __dirname,
      distExists: fs.existsSync(path.resolve(__dirname, "dist"))
    });
  });

  app.get("/api/debug", (req, res) => {
    const distPath = path.resolve(__dirname, "dist");
    const files = fs.existsSync(distPath) ? fs.readdirSync(distPath) : [];
    res.json({
      env: process.env,
      distPath,
      distFiles: files,
      cwd: process.cwd(),
      dirname: __dirname
    });
  });

  app.post("/api/leads", async (req, res) => {
    const { name, email, phone, carModel, service, message } = req.body;
    try {
      if (db) {
        const stmt = db.prepare(
          "INSERT INTO leads (name, email, phone, car_model, service, message) VALUES (?, ?, ?, ?, ?, ?)"
        );
        stmt.run(name, email, phone, carModel, service, message);
      } else {
        console.warn("Lead received but database is unavailable:", { name, email });
      }

      // Forward to Google Sheets if URL is configured
      const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: "POST",
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              name,
              email,
              phone,
              carModel,
              service,
              message,
              type: "lead"
            }),
            headers: { "Content-Type": "application/json" }
          });
          console.log("Successfully forwarded lead to Google Sheets");
        } catch (fetchError) {
          console.error("Failed to forward to Google Sheets:", fetchError);
        }
      }

      res.status(201).json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, error: "Failed to save lead" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    const { name, email, date, time, service } = req.body;
    try {
      if (db) {
        const stmt = db.prepare(
          "INSERT INTO bookings (name, email, date, time, service) VALUES (?, ?, ?, ?, ?)"
        );
        stmt.run(name, email, date, time, service);
      } else {
        console.warn("Booking received but database is unavailable:", { name, email });
      }

      // Forward to Google Sheets if URL is configured
      const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: "POST",
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              name,
              email,
              date,
              time,
              service,
              type: "booking"
            }),
            headers: { "Content-Type": "application/json" }
          });
          console.log("Successfully forwarded booking to Google Sheets");
        } catch (fetchError) {
          console.error("Failed to forward to Google Sheets:", fetchError);
          // We don't fail the whole request if Google Sheets fails, 
          // as it's already saved in the local DB.
        }
      }

      res.status(201).json({ success: true, message: "Booking confirmed" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, error: "Failed to save booking" });
    }
  });

  // Vite middleware for development
  const distPath = path.resolve(__dirname, "dist");
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(distPath);

  console.log(`[Server] Mode: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`[Server] Dist path: ${distPath}`);
  console.log(`[Server] Dist exists: ${fs.existsSync(distPath)}`);

  if (!isProduction) {
    console.log("[Server] Starting Vite in middleware mode...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Serving static files from dist...");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error(`[Server] Error: index.html not found at ${indexPath}`);
        res.status(404).send(`Production build not found. Please ensure 'npm run build' was executed.`);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
