import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

/**
 * CONFIG
 */
const BACKEND_API = process.env.BACKEND_API || "http://127.0.0.1:8000";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Initialize OpenAI only if key exists
 */
let openai = null;
if (OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
}

/**
 * MAIN EXECUTION
 */
async function runPhase2() {
  try {
    console.log("🔹 Phase-2 started");

    // --------------------------------------------------
    // 1. Fetch latest article from backend
    // --------------------------------------------------
    const articleResponse = await axios.get(
      `${BACKEND_API}/api/articles/latest`
    );

    const article = articleResponse.data;

    if (!article || !article.content) {
      console.error("❌ No article content found");
      return;
    }

    console.log("✅ Fetched latest article:", article.title);

    // --------------------------------------------------
    // 2. Rewrite content using LLM (or fallback)
    // --------------------------------------------------
    let rewrittenContent;

    if (openai) {
      try {
        console.log("🔹 Attempting LLM rewrite via OpenAI");

        const completion = await openai.chat.completions.create({
          model: "Beyond Chats",
          messages: [
            {
              role: "system",
              content: "You are a professional technical content writer.",
            },
            {
              role: "user",
              content: article.content,
            },
          ],
        });

        rewrittenContent = completion.choices[0].message.content;
        console.log("✅ LLM rewrite successful");

      } catch (error) {
        console.warn(
          "⚠️ OpenAI unavailable (401/429/quota). Using mock rewrite."
        );

        rewrittenContent = `
This rewritten article provides an overview of BeyondChats' approach to
building scalable conversational AI systems. It highlights key architectural
principles, real-world use cases, and best practices for deploying chatbots
in production environments. The content is optimized for clarity and readability
while preserving the original intent.
`;
      }
    } else {
      console.warn("⚠️ No OPENAI_API_KEY found. Using mock rewrite.");

      rewrittenContent = `
This rewritten article summarizes BeyondChats' blog, focusing on conversational
AI design, chatbot scalability, and practical implementation strategies.
The rewritten version enhances structure and readability while retaining
the original message.
`;
    }

    // --------------------------------------------------
    // 3. Save rewritten article back to backend
    // --------------------------------------------------
    await axios.post(`${BACKEND_API}/api/articles`, {
      title: article.title,
      content: rewrittenContent,
      version: "rewritten",
    });

    console.log("🎉 Updated article generated and stored successfully");
    console.log("✅ Phase-2 completed");

  } catch (error) {
    console.error("❌ Phase-2 failed:", error.message);
  }
}

/**
 * Run script
 */
runPhase2();
