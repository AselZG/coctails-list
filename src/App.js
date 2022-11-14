import { Routes, Route } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CoctailDetails from "./Components/CoctailDetails";
import Loading from "./Components/Loading";
import Coctails from "./Components/Coctails";

export default function App() {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  const mainUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s";

  const handlerFetch = async (url) => {
    setLoading(true);
    try {
      const responce = await axios.get(url);
      setMainData(responce.data.drinks);
      setFilteredDrinks(responce.data.drinks);
    } catch (err) {
      console.err("error fetching data");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    handlerFetch(mainUrl);
  }, []);

  const inputHandler = (event) => {
    let inputValue = event.target.value;
    setInput(inputValue);
    const copyData = [...mainData];
    const filtered = copyData.filter((item) => {
      return item.strDrink.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredDrinks(filtered);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <form className="search-form">
              <h2>cocktails API</h2>
              <input
                type="text"
                placeholder="search your favorite cocktail"
                name="drink"
                onChange={inputHandler}
                value={input}
              />
            </form>
            <section className="section cocktails">
              <div className="section-center">
                {loading && filteredDrinks.length === 0 ? (
                  <Loading />
                ) : (
                  <Coctails filteredDrinks={filteredDrinks} />
                )}
              </div>
            </section>
          </div>
        }
      />
      <Route path="/:itemId" element={<CoctailDetails mainData={mainData} />} />
    </Routes>
  );
}
