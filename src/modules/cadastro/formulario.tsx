import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Input } from "../../components/input";
import { Fieldset } from "../../components/fieldset";

export function Formulario() {
  const { register, handleSubmit, formState: { errors } } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data) =>
    handleCadastro(data);

  const handleCadastro = async (data: any) => {
    console.log("Cadastrado", data);
    const dados = {
      ...data,
      telefonePrincipalDDD: "65",
      telefoneSecundarioDDD: "65",
      telefoneSecundario: data.telefonePrincipal,
      nomeDestinatario: data.nomeCompleto,
      zonaRural: false,
      newsletter: true,
    }

    try {
      await axios.post("https://api-ecommerce.martinello.com.br/v1/auth/cadastro", dados);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-4 w-full">
      <Input name="Nome Completo" type="text" register={{ ...register("nomeCompleto") }} />
      <Input name="Email" type="email" register={{ ...register("email") }} />
      <Input name="Senha" type="password" register={{ ...register("senha") }} />
      <Input name="Confirmar Senha" type="password" register={{ ...register("confirmarSenha") }} />
      <Input name="Telefone Principal" type="text" register={{ ...register("telefonePrincipal") }} />
      <Input name="Telefone Secundario" type="text" register={{ ...register("telefoneSecundario") }} />
      <Input name="Data de Nascimento" type="date" register={{ ...register("dataNascimento") }} />
      <Input name="CPF" type="text" register={{ ...register("cpf") }} />
      <Fieldset name="Sexo">
        <input id="feminino" type="radio" value={"1"}  {...register("sexo")} />
        <label htmlFor="feminino">Feminino</label>
        <input id="masculino" type="radio" value={"2"} {...register("sexo")} />
        <label htmlFor="masculino">Masculino</label>
        <input id="outro" type="radio" value={"3"} {...register("sexo")} />
        <label htmlFor="outro">Outro</label>
      </Fieldset>

      <h3 className="text-xl">Endereço</h3>
      <Input name="CEP" type="text" register={{ ...register("cep") }} />
      <Input name="Cidade" type="text" register={{ ...register("cidade") }} />
      <Input name="Estado" type="text" register={{ ...register("estado") }} />
      <Input name="Bairro" type="text" register={{ ...register("bairro") }} />
      <Input name="Endereço" type="text" register={{ ...register("endereco") }} />
      <Input name="Complemento" type="text" register={{ ...register("complemento") }} />
      <Input name="Numero" type="text" register={{ ...register("numero") }} />
      <Input name="Referencia" type="text" register={{ ...register("referencia") }} />
      <button type="submit">Cadastrar</button>
    </form>
  )
}
