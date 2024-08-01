import { useCallback } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  usuario: string;
  senha: string;
  sistema: string;
}

export function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    handleLogin(data.usuario, data.senha, data.sistema);

  const handleLogin = useCallback(
    async (usuario: string, senha: string, sistema: string) => {
      try {
        await axios
          .post("https://api-auth.martinello.com.br/token/api/auth", {
            usuario,
            senha,
            sistema,
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    },
    [],
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
