import "./App.css";
import Registration from "./components/RegistrationForm/Registration";
import TopHeading from "./components/heading/TopHeading";

function App() {
  return (
    <>
      <TopHeading />
      <div className="registraion">
        <Registration />
      </div>
    </>
  );
}

export default App;
