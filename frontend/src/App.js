import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [paymentData, setPaymentData] = useState({
    amount: "",
    currency: "USD",
    payerName: "",
    payerEmail: "",
    description: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/create-payment",
        paymentData
      );
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.response.data.error || "An error occurred" });
    }
  };

  return (
    <div className="App">
      <h1>USDC Payment Integration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={paymentData.amount}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="payerName"
          placeholder="Payer Name"
          value={paymentData.payerName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="payerEmail"
          placeholder="Payer Email"
          value={paymentData.payerEmail}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={paymentData.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Payment</button>
      </form>
      {result && (
        <div className="result">
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
