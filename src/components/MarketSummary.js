import { useState, useEffect } from "react";
import "./MarketSummary.css";

const MarketSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then(res => {
        if (!res.ok) throw new Error(`API error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setSummary(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 className="loading-text">Market summary loading...</h3>;
  }
  if (
    !summary ||
    !summary.total_market_cap ||
    !summary.total_volume ||
    !summary.market_cap_percentage
  ) {
    return <><h2>Loading market data...</h2> <h2>If this takes longer, API rate limit may be reached</h2></>;
  }

  return (
    <div className="market-summary">
      <div className="summary-card">
        <p className="summary-label">Total Market Cap</p>
        <h3 className="summary-value">
          ${Number(summary.total_market_cap.usd).toLocaleString()}
        </h3>
      </div>

      <div className="summary-card">
        <p className="summary-label">24h Volume</p>
        <h3 className="summary-value">
          ${Number(summary.total_volume.usd).toLocaleString()}
        </h3>
      </div>

      <div className="summary-card">
        <p className="summary-label">BTC Dominance</p>
        <h3 className="summary-value">{summary.market_cap_percentage.btc.toFixed(1)}%</h3>
      </div>
    </div>
  );
};

export default MarketSummary;