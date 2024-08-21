import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import "./styles.css"

export function DetalhesProduto() {
  let { id } = useParams();
  const parser = new DOMParser();

  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState();
  const descricao = parser.parseFromString(produtos?.informacoes, "text/html")
  console.log(id, produtos)

  const getProdutos = useCallback(async () => {
    setCarregando(true)
    await axios.get(`https://api-ecommerce.martinello.com.br/v2/produtos/${id}?vitrine=true`).then((res) => {
      setProdutos(res.data);
    }).catch((err) => {
      console.log(err);
    });
    setCarregando(false)
  }, []);


  useEffect(() => {
    getProdutos();
  }, [])

  return (
    <div>
      {carregando ? "Carregando..." : (
        <>
          <h1>{produtos?.nome}</h1>
          <div className="detalhes">
            <div className="img-galeria">
              {produtos?.imagens.map((i) => <img key={i} loading="lazy" className="img-produto" src={i} />)}
            </div>
            <div>
              <p>Preço: R$ {produtos?.precoPor}</p>
              <p>Condição: {produtos?.condicao}</p>
            </div>
          </div>
          <section dangerouslySetInnerHTML={{ __html: descricao.body.innerHTML }}>

          </section>
        </>
      )}

    </div>
  )
}
