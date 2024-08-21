import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"


export function HomeProducts() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState(false);

  const getProdutos = useCallback(async () => {
    await axios.get("https://api-ecommerce.martinello.com.br/v1/produtos/app").then((res) => {
      setProdutos(res.data.destaques);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleClick = useCallback(async (id: string) => {
    navigate(`/produto/${id}`);
  }, []);


  useEffect(() => {
    getProdutos();
  }, [])

  return (
    <div>
      <h1>Produtos em Destaque</h1>
      <div className="grid-produtos">
        {
          produtos ? produtos.map((produto) => (

            <div className="card-produtos" onClick={() => handleClick(produto.id)}>
              <p>{produto!.nome}</p>
              <p>Preço: R$ {produto.precoPor}</p>
              <p>Categoria: {produto.categoriaNome}</p>
              <img className="card-imagens" src={produto.imagens[0]} />

            </div>
          )) : <div>sem produtos</div>
        }
      </div>
    </div>
  );
}