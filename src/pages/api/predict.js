// src/pages/api/predict.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { symptoms } = req.body;

  console.log("📝 Received symptoms:", symptoms); // Log input

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a medical assistant that predicts diseases based on symptoms.",
          },
          {
            role: "user",
            content: `Patient symptoms: ${symptoms}. What disease could it be?`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    console.log("✅ OpenAI API response:");
    console.dir(data, { depth: null });

    const prediction = data.choices?.[0]?.message?.content?.trim();

    if (!prediction) {
      console.log("❌ No prediction in response.");
      return res.status(200).json({ result: "⚠️ No prediction found in API response." });
    }

    res.status(200).json({ result: prediction });
  } catch (error) {
    console.error("🚨 Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to call OpenAI API." });
  }
}
