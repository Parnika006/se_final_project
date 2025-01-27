import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";

function Main() {
  return (
    <div className="search__page">
      <Header />

      <h1 className="search__page__heading">
        What&apos;s going on in the world?
      </h1>
      <p className="search__page__note">
        Find the latest news on any topic and save them in your personal
        account.
      </p>

      <SearchForm />
    </div>
  );
}

export default Main;
