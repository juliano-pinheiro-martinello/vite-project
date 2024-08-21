
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Button } from "./components/button";
import { useAuth } from "./context/userContext";
import { HomeProducts } from "./modules/homeProducts";

function App() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <>
      {user ? user : null}
      <HomeProducts />
      <Button onClick={() => navigate("/login")}>Login</Button>
    </>
  );
}

export default App;
