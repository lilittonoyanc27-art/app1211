import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize AI Client lazily or check/handle missing API key gracefully
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
}

// API: AI Tutor for Spanish Sentence explanations and translations in Armenian
app.post("/api/ai-tutor", async (req: Request, res: Response) => {
  const { spanishCode, armenianText, userSentence, themeContext, action } = req.body;

  if (!API_KEY || !ai) {
    return res.status(200).json({
      success: false,
      error: "GEMINI_API_KEY is not configured",
      message: "AI-օգնականը ժամանակավորապես անհասանելի է։ Խնդրում ենք ավելացնել ձեր GEMINI_API_KEY-ը Settings > Secrets բաժնում։ Սակայն բոլոր պատրաստի խաղերն ու դասերը լիարժեք աշխատում են անցանց ռեժիմում:"
    });
  }

  try {
    let prompt = "";
    if (action === "explain") {
      prompt = `You are an expert Spanish language tutor who speaks fluent Armenian. 
Help an Armenian speaking student understand how to construct the sentence: "${armenianText}" in Spanish.
The correct Spanish representation is: "${spanishCode}".
Provide:
1. Exact translation of the sentence.
2. Word-by-word breakdown (each Spanish word with its Armenian translation, part of speech, and role).
3. The specific grammar structure rule (SVO, word order, gender agreements, prepositions) compared with Armenian (Armenian has free order but complex case endings, Spanish uses prepositions and rigid structure like SVO, adjectives after nouns, etc.). Explanations must be detailed, in very clear and educational Armenian.
Your response must be styled in structured Markdown, using bold titles, bullet points, and brief tables if needed. Translate terms politely and accurately into Armenian. Do not use generic translations. Make it engaging for learning!`;
    } else if (action === "check") {
      prompt = `You are a friendly Spanish language tutor who speaks fluent Armenian. 
The student is trying to translate the Armenian sentence: "${armenianText}" into Spanish.
The model answer is: "${spanishCode}".
The user attempted: "${userSentence}".
Task:
1. Actively compare the user's sentence with the model answer. Is it 100% correct, partially correct (small typos/accents missing), or contains grammar errors?
2. Explain the difference or the error. If there are typos or accent mark omissions (like "esta" instead of "está"), explain their importance.
3. Show how the word order should go. explain in Armenian why we say it this way.
Keep the tone encouraging, and use constructive feedback. Write the response in beautiful Markdown in Armenian.`;
    } else {
      // General question
      prompt = `You are a Spanish grammar tutor speaking fluent Armenian.
Answer the student's question about Spanish grammar contextually related to ${themeContext || 'general sentences'}.
Question: "${userSentence || 'How to build sentences in Spanish?'}"
Answer clearly in Armenian with examples, explanations, and key rules (word order, article agreement, conjugation). Structure with Markdown.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an auxiliary educational software agent. Keep translations natural and polite. Explain grammar in beautifully formatted Armenian (Հայերեն).",
        temperature: 0.3,
      }
    });

    const text = response.text || "Կներեք, պատասխան չհաջողվեց գեներացնել:";
    return res.json({
      success: true,
      text: text
    });
  } catch (err: any) {
    console.error("AI Tutor API Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Internal server error during generate content",
      message: "Սխալ տեղի ունեցավ AI-ի հետ կապ հաստատելիս: Խնդրում ենք նորից փորձել մի փոքր ուշ:"
    });
  }
});

// Serve assets and static files
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    
    // Fallback index.html loading for dev
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "index.html"));
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Development server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  // Single Page Application route
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Production server running on port ${PORT}`);
  });
}
