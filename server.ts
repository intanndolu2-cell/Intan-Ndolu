import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Gemini API
// ALWAYS check if GEMINI_API_KEY is available and use it server-side.
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey && geminiApiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON bodies
  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", apiAvailable: !!ai });
  });

  // API Route: Chat with Driver (Cameron Williamson)
  app.post("/api/chat", async (req, res) => {
    const { messages, driverName, serviceType } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Must be an array." });
    }

    const driver = driverName || "Cameron Williamson";
    const service = serviceType || "GoRide";

    // Standard fallback replies in Indonesian if Gemini is not available or fails
    const fallbackReplies = [
      "Siap Kak, saya sudah dekat lokasi penjemputan ya.",
      "Sesuai peta ya Kak, mohon ditunggu sebentar.",
      "Siap, helm steril sudah saya siapkan. Pakai jaket Gojek hijau terang ya.",
      "Saya sedang di jalan Kak, macet sedikit tapi aman.",
      "Oke Kak, saya parkir di depan minimarket dekat lokasi penjemputan ya."
    ];

    if (!ai) {
      // Simulate slow response for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      return res.json({ reply: randomReply });
    }

    try {
      // Construct prompt for Gemini
      const systemInstruction = `
        Anda adalah ${driver}, seorang mitra driver ${service} yang sangat ramah, sopan, komunikatif, dan profesional. 
        Gunakan gaya bahasa Indonesia yang santai namun sopan seperti mitra driver ojek online (ojol) sungguhan. 
        Sering-sering menggunakan sebutan 'Kak', 'Pak', atau 'Bu'. 
        Gunakan istilah-istilah khas driver seperti "Siap meluncur", "Sesuai aplikasi ya", "Sudah dekat lokasi", "Mohon ditunggu ya", "Helm ready".
        Jawablah dengan singkat, padat, dan natural (maksimal 2 kalimat) seolah-olah Anda sedang mengetik di handphone saat berkendara aman atau sedang menepi.
        Konteks: Saat ini Anda sedang menerima pesanan ${service} dari pengguna.
      `;

      // Transform history for generateContent
      // We'll map messages into string text
      const conversationHistory = messages.map((m: any) => {
        const senderLabel = m.sender === "user" ? "Penumpang" : `${driver} (${service} Driver)`;
        return `${senderLabel}: ${m.text}`;
      }).join("\n");

      const prompt = `
        Berikut riwayat obrolan sejauh ini:
        ${conversationHistory}
        
        Penumpang baru saja mengirim pesan terakhir. Balaslah sebagai ${driver} sesuai instruksi sistem. Jangan sertakan label nama Anda di awal jawaban, langsung berikan balasan chatnya saja.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.8,
        }
      });

      const replyText = response.text?.trim() || fallbackReplies[0];
      return res.json({ reply: replyText });

    } catch (error: any) {
      console.error("Gemini API Error in server.ts:", error);
      // Fail gracefully with a friendly driver reply
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      return res.json({ reply: randomReply, error: error.message });
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
