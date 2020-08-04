import React from "react";
import { heroes } from "../../data/heroes";
import { HeroCard } from "../heroes/HeroCard";
import { useForm } from "../../custom-hooks/useForm";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const heroesFiltered = heroes;
  const [formValues, handleInputChange] = useForm({ searchText: q });
  const { searchText } = formValues;
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };
  return (
    <div>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchText"
              placeholder="Find your hero"
              className="form-control"
              autoComplete="off"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
