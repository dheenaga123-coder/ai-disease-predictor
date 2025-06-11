// pages/index.js
import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setPrediction("");

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setPrediction(data.result);
    } catch (error) {
      setPrediction("Error occurred while predicting.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "100px auto", textAlign: "center" }}>
      <h1>Disease Prediction App</h1>
      <p>Enter your symptoms below (comma separated):</p>

      <textarea
        rows={5}
        style={{ width: "100%", padding: 10 }}
        placeholder="e.g. headache, fever, cough"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <br />
      <button
        onClick={handlePredict}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {prediction && (
        <div style={{ marginTop: 30 }}>
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}
