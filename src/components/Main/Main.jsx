import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";

function Main({
  handleLoginClick,
  handleMenuBarClick,
  isOpen,
  isLoggedIn,
  handleSignOut,
  setSearchQuery,
  setVisibleCount,
  handleSearch,
  closeActiveModal,
  inputValue,
  setInputValue,
}) {
  return (
    <main className="search__page">
      <Header
        handleLoginClick={handleLoginClick}
        handleMenuBarClick={handleMenuBarClick}
        isOpen={isOpen}
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        changeCss={false}
        closeActiveModal={closeActiveModal}
      />
      <div className="search__content">
        <h1 className="search__heading">What&apos;s going on in the world?</h1>
        <p className="search__note">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>

      <SearchForm
        setSearchQuery={setSearchQuery}
        setVisibleCount={setVisibleCount}
        handleSearch={handleSearch}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </main>
  );
}

export default Main;
