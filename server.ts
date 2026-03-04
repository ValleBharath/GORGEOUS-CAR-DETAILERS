import express from "express";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const db = new Database("detailers.db");

// Initialize database
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/leads", async (req, res) => {
    const { name, email, phone, carModel, service, message } = req.body;
    try {
      // Save to local database
      const stmt = db.prepare(
        "INSERT INTO leads (name, email, phone, car_model, service, message) VALUES (?, ?, ?, ?, ?, ?)"
      );
      stmt.run(name, email, phone, carModel, service, message);

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
      // Save to local database
      const stmt = db.prepare(
        "INSERT INTO bookings (name, email, date, time, service) VALUES (?, ?, ?, ?, ?)"
      );
      stmt.run(name, email, date, time, service);

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
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(process.cwd(), "dist"));

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
