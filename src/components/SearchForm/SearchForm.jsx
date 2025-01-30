import "./SearchForm.css";
import { useState } from "react";

function SearchForm() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setError("Please enter a keyword");
      return;
    }

    setError(""); /*  Clear error if input is valid */
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (error) {
      setError(""); /*  Clear error as soon as the user starts typing */
    }
  };

  return (
    <form className="search__form">
      <input
        type="text"
        className="search__form__input"
        placeholder="Enter Topic"
        required
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      {error && <p className="search__error-message">{error}</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="search__form__submit-button"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
