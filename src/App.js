import React, { useState } from 'react';
import './App.css';

function App() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState('');

    const handleConvert = async () => {
        if (!amount) {
            alert('Please enter an amount.');
            return;
        }

        // Fetch live exchange rate from an API
        const apiKey = 'your-api-key-here'; // Replace with your actual API key
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            setResult(`Converted Amount: ${convertedAmount} ${toCurrency}`);
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            setResult('Error fetching exchange rates. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1>Currency Converter</h1>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <div>
                <label>From:</label>
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                    {/* Add more currencies */}
                </select>
            </div>
            <div>
                <label>To:</label>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                    {/* Add more currencies */}
                </select>
            </div>
            <button onClick={handleConvert}>Convert</button>
            <p>{result}</p>
        </div>
    );
}

export default App;