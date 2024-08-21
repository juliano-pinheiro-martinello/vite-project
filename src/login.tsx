import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./context/userContext";

interface IFormInput {
  usuario: string;
  senha: string;
  sistema: string;
}

export function Login() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const { signed, Login, user } = useAuth();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    handleLogin(data.usuario, data.senha, data.sistema);

  console.log(user);

  const handleLogin = useCallback(
    async (usuario: string, senha: string, sistema: string) => {
      try {
        setCarregando(true);
        await Login(usuario, senha, sistema);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
      setCarregando(false);
    },
    [Login],
  );
  return (
    <div>
      <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-input">
          <label>Usuário </label>
          <input type="text" {...register("usuario")} />
        </div>
        <div className="container-input">
          <label>Senha </label>
          <input type="password" {...register("senha")} />
        </div>
        <select {...register("sistema")}>
          <option>F0000 </option>
          <option>F0001 </option>
          <option>F0002 </option>
        </select>
        <button type="submit" disabled={carregando}>
          {carregando ? "Aguarde..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
