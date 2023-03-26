import { useState, useEffect } from "react";
import { API } from "../constants/api.js";
import Beeritem from "./BeerItem";
import Heading from "./layout/Heading";

function Beerlist() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API);

        if (response.ok) {
          const json = await response.json();
          setBeers(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <>
      <Heading content="Home" />
      <div className="beers">
        {beers.map(function (beer) {
          const { id, name, price } = beer;
          return <Beeritem key={id} id={id} name={name} price={price} />;
        })}
      </div>
    </>
  );
}

export default Beerlist;
