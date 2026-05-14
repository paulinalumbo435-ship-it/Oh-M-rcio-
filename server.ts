import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Simulator de Tunnel (Proxy)
  app.post("/api/tunnel", async (req, res) => {
    const { url, payload, sni } = req.body;
    
    // Simula o comportamento do Psiphon manipulando headers
    try {
      console.log(`[TUNNEL] Request to: ${url} with SNI: ${sni}`);
      const response = await axios.get(url, {
        headers: {
          'X-Forwarded-For': '1.1.1.1',
          'User-Agent': 'Psiphon/3.0',
          'X-Payload-Custom': payload || 'standard-header-v1'
        }
      });
      res.json({ 
        status: "success", 
        data: response.data.substring(0, 500), // Retorna só um pedaço do site
        tunnelResponseTime: Math.floor(Math.random() * 200) + 50 
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Falha no túnel SSH/TLS" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Marcio VPN Server running on http://localhost:${PORT}`);
  });
}

startServer();
