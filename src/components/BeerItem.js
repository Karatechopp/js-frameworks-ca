import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Beeritem({ id, name, price }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleFavoriteToggle = () => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let newFavorites;
    if (isFavorited) {
      newFavorites = existingFavorites.filter((fav) => fav.id !== id);
    } else {
      newFavorites = [...existingFavorites, { id, name, price }];
    }
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    const isItemFavorited = favorites.some((fav) => fav.id === id);
    setIsFavorited(isItemFavorited);
  }, [favorites, id]);

  return (
    <div className="beers-item">
      <Link to={`${window.location.pathname === "/favourites" ? ".." : ""}/detail/${id}`}>
        <h5>{name}</h5>
        <p>{price}</p>
      </Link>
      <button onClick={handleFavoriteToggle}>{isFavorited ? "Added" : "Favorite"}</button>
    </div>
  );
}

Beeritem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Beeritem;
