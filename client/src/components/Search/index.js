import { useEffect, useState } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import "./index.css";
import ItemCard from "../Card/ItemCard/ItemCard";

const Search = () => {
  const search = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Update the search parameter in the URL
    setSearchParams({ query: search.searchQuery }, { replace: true });

    fetch(`https://shema-backend.vercel.app/api/items/`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the data based on the search query
        const filteredData = data.filter((item) =>
          item.name.toLowerCase().includes(search.searchQuery.toLowerCase())
        );

        setResults(filteredData);
        console.log(filteredData);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }, [search.searchQuery]);

  return (
    <div className="search__container">
      <div className="search__container__body">
        {results.length > 0 && search.searchQuery !== "" ? (
          results.map((result, index) => (
            <div key={index} className="search-result">
              <ItemCard item={result} category={result.category} />
            </div>
          ))
        ) : (
          <div className="search__container__header">
            <h1>No results found for "{search.searchQuery}"</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
