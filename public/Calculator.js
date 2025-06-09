import React, { useState } from 'react';

const Calculator = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // Здесь будет логика расчета (пример с фиксированным курсом)
    const btcRate = 50000; // Замените на реальный курс из API
    setResult(amount * btcRate);
  };

  return (
    <div className="calculator">
      <h2>Exchange Calculator</h2>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in BTC"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result && <p>≈ {result.toFixed(2)} USD</p>}
    </div>
  );
};

export default Calculator;
