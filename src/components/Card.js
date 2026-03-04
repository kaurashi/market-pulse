import { useEffect, useState } from "react";
import "./Card.css";

const FAVORITES_KEY = "favoriteCoins";

const Card = ({ coin, fullName, symbol, price, change }) => {
  
  const isPositive = change >= 0;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if(!coin) return;
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setIsFav(favorites.some((c) => c.id === coin.id));
  }, [coin]);

  if(!coin) return;

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    if (isFav) {
      favorites = favorites.filter((c) => c.id !== coin.id);
    } else {
      favorites.push(coin);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    setIsFav(!isFav);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          {fullName}
          <span className="symbol">{symbol.toUpperCase()}</span>
        </h3>

        <button className="fav-btn" onClick={toggleFavorite}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <p className="card-price">${price.toFixed(2)}</p>

      <p className={`card-change ${isPositive ? "positive" : "negative"}`}>
        {isPositive ? "▲" : "▼"} {change.toFixed(2)}%
      </p>
    </div>
  );
};

export default Card;