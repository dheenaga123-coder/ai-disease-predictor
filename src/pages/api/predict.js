import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { symptoms } = req.body;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `The user has these symptoms: ${symptoms}. What is the most likely disease? Respond in 1 sentence.`,
          },
        ],
        temperature: 0.7,
      });

      console.log("OpenAI Response:", response); // 👈 Add this line to debug

      const prediction = response.choices?.[0]?.message?.content;

      if (prediction) {
        res.status(200).json({ prediction });
      } else {
        res.status(200).json({ prediction: "No prediction found in API response." });
      }
    } catch (error) {
      console.error("OpenAI error:", error);
      res.status(500).json({ error: "API request failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}