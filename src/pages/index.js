import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>
        AI Disease Predictor
      </h1>

      <textarea
        rows={4}
        placeholder="Enter symptoms (e.g., fever, cough)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
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
        <div style={{ marginTop: '1.5rem', background: '#f3f4f6', padding: '1rem', borderRadius: '8px' }}>
          <strong>Prediction:</strong>
          <p>{output}</p>
        </div>
      )}
    </main>
  );
}