import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { AiFillCheckCircle } from "react-icons/ai";

function CoctailDetails() {
  const { itemId } = useParams();
  const [coctail, setCoctail] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  // const coctail = mainData.find((coctail) => coctail.idDrink === itemId);

  const handlerFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`
      );
      setCoctail(res.data.drinks[0]);
      if (res.data.drinks) {
        const {
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        } = res.data.drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        ];
        setIngredients(ingredients);
      } else {
        setIngredients(null);
      }
    } catch (err) {
      console.err("error fetching data");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    handlerFetch();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="single-drink">
          <img
            className="drink-img"
            src={coctail.strDrinkThumb}
            alt={coctail.strDrink}
          />
          <article className="drink-info">
            <h2 className="drink-name">{coctail.strDrink}</h2>
            <p className="drink-desc">{coctail.strInstructions}</p>
            <ul className="drink-ingredients">
              {ingredients.map((ingredient, index) => {
                return ingredient ? (
                  <li key={index}>
                    <AiFillCheckCircle className="far fa-check-square" />
                    {ingredient}
                  </li>
                ) : null;
              })}
            </ul>
            <Link to="/" className="btn">
              all cocktails
            </Link>
          </article>
        </section>
      )}
    </>
  );
}

export default CoctailDetails;
