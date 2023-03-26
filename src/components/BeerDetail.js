import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../constants/api";

function Beerdetail() {
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/");
  }

  const url = API + "/" + id;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            setBeer(json);
          } else {
            setError("error occured");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <div className="beer-detail">
      <h1>{beer.name}</h1>
      <img src={beer.image} alt="Beer or placeholder"></img>
      <p>{beer.price}</p>
    </div>
  );
}

export default Beerdetail;
