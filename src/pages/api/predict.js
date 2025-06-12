// pages/api/predict.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is missing in .env.local');
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a medical assistant that predicts diseases based on symptoms.',
          },
          {
            role: 'user',
            content: `The user reports the following symptoms: ${input}. What is the likely disease?`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    // Handle API error responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error('🧨 OpenAI API response error:', errorText);
      return res.status(500).json({ error: 'OpenAI API Error', details: errorText });
    }

    const data = await response.json();

    // ✅ Log full API response for debugging
    console.log('📦 OpenAI response:', JSON.stringify(data, null, 2));

    const message = data?.choices?.[0]?.message?.content;
    if (!message) {
      console.error('⚠️ No message content in OpenAI response:', data);
      return res.status(500).json({ result: '⚠️ No prediction found in API response.' });
    }

    // Return prediction
    return res.status(200).json({ result: message.trim() });

  } catch (error) {
    console.error('🔥 Unexpected API error:', error);
    return res.status(500).json({ error: 'Failed to fetch prediction from OpenAI.' });
  }
}
