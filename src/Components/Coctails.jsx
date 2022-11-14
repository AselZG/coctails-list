import { Link } from "react-router-dom";

function Coctails({ filteredDrinks }) {
  return (
    <>
      {filteredDrinks.length > 0 ? (
        filteredDrinks.map((item) => {
          return (
            <Link to={`/${item.idDrink}`}>
              <article className="cocktail" key={item.idDrink}>
                <img src={item.strDrinkThumb} alt={item.strDrink} />
                <h3>{item.strDrink} </h3>
              </article>
            </Link>
          );
        })
      ) : (
        <div className="title">
          <h2>sorry, no drinks matched your search</h2>
        </div>
      )}
    </>
  );
}

export default Coctails;
