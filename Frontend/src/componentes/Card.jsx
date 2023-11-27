
function Card(props) {
  return (
    <section className="h-90 w-72   flex  rounded-xl p-3 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] box-border">
      <label htmlFor="imagem" className="self-center">
        <img
          src={props.imagem}
          alt="imagem produto"
          className="w-imagemCard h-imagemCard"
        />
      </label>

      <h2 className="mt-10 mb-1.5 font-semibold box-border">
        {props.nome}
      </h2>
      <div className="flex justify-between">
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ {props.valorTotal}
        </p>
      </div>
    </section>
  );
}

export default Card;
