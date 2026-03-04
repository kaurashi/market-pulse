import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import MarketSummary from "../components/MarketSummary";
import "./Dashboard.css";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });

          fetch("https://api.coingecko.com/api/v3/global")
      .then(res => res.json())
      .then(data => {
        setSummary(data.data);
        setSummaryLoading(false);
      })
      .catch(() => setSummaryLoading(false));

  }, []);

  if (loading) {
    return <h2 className="loading-text">Data is loading...</h2>;
  }

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (sortBy === "price") return b.current_price - a.current_price;
    if (sortBy === "change")
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    if (sortBy === "market_cap") return b.market_cap - a.market_cap;
    return 0;
  });

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="dashboard-container">
        <h1 id="dashboard-header">MARKET OVERVIEW</h1>

        <MarketSummary
        summary ={summary}
        loading={summaryLoading}
        />

        <div className="cards-container">
          {sortedCoins.map((coin) => (
            <Card
              key={coin.id}
              coin={coin}
              fullName={coin.name}
              symbol={coin.symbol}
              price={coin.current_price}
              change={coin.price_change_percentage_24h}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

