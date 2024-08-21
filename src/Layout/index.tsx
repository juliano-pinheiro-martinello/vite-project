import { useNavigate, Outlet } from "react-router-dom";
import "./styles.css"
import { Button } from "../components/button";


export function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <div><img src="https://recursos.martinello.com.br/i/logo_martinello.png" /></div>
        <div><Button onClick={() => navigate("/login")}>Login</Button></div>
      </header>
      <Outlet />
    </>
  )
}