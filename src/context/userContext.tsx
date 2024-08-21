import { createContext, FC, useContext, useEffect, useState } from "react";
import axios from "axios";

interface UserContextData {
  signed: boolean;
  token: string | null;
  user: string | null;
  Login(usuario: string, senha: string, sistema: string): Promise<void>;
  Logout(): void;
}

const storageUser = JSON.stringify(localStorage.getItem("@App:user"));
const storageToken = localStorage.getItem("@App:token");

const UserContext = createContext<UserContextData>({
  token: storageToken,
  user: storageUser,
} as UserContextData);

export const UserProvider: FC = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
      setToken(storageToken);
    }
  }, []);

  async function Login(usuario: string, senha: string, sistema: string) {
    try {
      await axios
        .post("https://api-auth.martinello.com.br/token/api/auth", {
          usuario,
          senha,
          sistema,
        })
        .then((res) => {
          localStorage.setItem("@App:user", res!.data.usuario.usuario);
          localStorage.setItem("@App:token", res!.data.token);
          setUser(res!.data.usuario.usuario);
          setToken(res!.data.token);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function Logout() {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  const signed = Boolean(token && user);

  return (
    <UserContext.Provider value={{ token, user, signed, Login, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(UserContext);
  return context;
}
