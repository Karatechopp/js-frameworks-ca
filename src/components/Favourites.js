import Beeritem from "./BeerItem";
import Heading from "./layout/Heading";

function Favourites() {
  const favourites = JSON.parse(localStorage.getItem("favorites"));

  return (
    <>
      <Heading content="Favourites"></Heading>
      <div className="beers">
        {favourites.length > 0 ? (
          favourites.map(function (beer) {
            return <Beeritem key={beer.id} id={beer.id} name={beer.name} price={beer.price} />;
          })
        ) : (
          <div>You have no favourites</div>
        )}
      </div>
    </>
  );
}

export default Favourites;
