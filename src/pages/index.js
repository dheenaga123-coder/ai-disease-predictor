import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true); // <-- new state

  const handleSubmit = async () => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setOutput(data.result || '⚠️ No prediction found in API response.');
  };

  if (showWelcome) {
    return (
      <main style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>
        <h1>👋 Welcome to the AI Disease Predictor</h1>
        <p>Describe your symptoms and let AI help you understand them.</p>
        <button
          onClick={() => setShowWelcome(false)}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Start
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        color: '#ffffff',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}
      >
        AI Disease Predictor
      </h1>

      <textarea
        rows={4}
        placeholder="Enter symptoms (e.g., fever, cough)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#111827',
          color: '#f9fafb',
          border: '1px solid #374151',
          borderRadius: '4px',
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Predict
      </button>

      {output && (
        <div
          style={{
            marginTop: '1.5rem',
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            borderRadius: '8px',
            color: '#111827',
            fontWeight: '500',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <strong>Prediction:</strong>
          <p>{output}</p>
        </div>
      )}
    </main>
  );
}
