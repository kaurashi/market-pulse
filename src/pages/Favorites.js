// import React from 'react'

// export default function Favorites() {
//   return (
//     <div>
//       <h2 style={{padding : "2rem" , color : "black"}}>Favorites Page (commimg soon)!</h2>
//     </div>
//   )
// }
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteCoins")) || [];
    setFavorites(stored);
  }, []);

  if (favorites.length === 0) {
    return <h2 style={{ padding: "2rem" , color : "black"}}>No favorites yet ❤️</h2>;
  }

  return (
    <div className="cards-container">
      {favorites.map((coin) => (
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
  );
};

export default Favorites;
