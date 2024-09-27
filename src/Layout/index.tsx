import { useNavigate, Outlet } from "react-router-dom";
import "./styles.css"
import { Button } from "../components/button";
import { useAuth } from "../context/userContext";


export function Layout() {
  const navigate = useNavigate();
  const { user, Logout, signed } = useAuth();

  return (
    <>
      <header className="header">
        <div className="flex justify-between mx-auto max-w-screen-xl">
          <div>
            <img src="https://recursos.martinello.com.br/i/logo_martinello.png" />
          </div>
          <div>
            <p style={{ marginRight: "10px" }}>{user}</p>
            {!signed ? <Button onClick={() => navigate("/login")}>Login</Button> : <Button onClick={() => Logout()}>Sair</Button>}
          </div>
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto px-0">

        <Outlet />
      </div>
    </>
  )
}