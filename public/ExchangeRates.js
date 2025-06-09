import React, { useEffect, useState } from 'react';

const ExchangeRates = () => {
  const [rates, setRates] = useState({ bitcoin: { usd: 0 }, ethereum: { usd: 0 } });

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
      .then(res => res.json())
      .then(data => setRates(data));
  }, []);

  return (
    <div className="exchange-rates">
      <h2>Live Rates</h2>
      <div className="rates-grid">
        <div className="rate-card">
          <span>BTC/USD:</span> <strong>${rates.bitcoin?.usd}</strong>
        </div>
        <div className="rate-card">
          <span>ETH/USD:</span> <strong>${rates.ethereum?.usd}</strong>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
