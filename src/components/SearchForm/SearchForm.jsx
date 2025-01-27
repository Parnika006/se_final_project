import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search__form">
      <input
        type="text"
        className="search__form__input"
        placeholder="Enter Topic"
      ></input>
      <button type="submit" className="search__form__submit-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
