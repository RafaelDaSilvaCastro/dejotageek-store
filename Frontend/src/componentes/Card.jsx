function Card() {
  return (
    <section className="h-90 w-72 hover:scale-105 duration-150  flex  rounded-xl p-5 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
      <img src="../../public/assets/camiseta-card.png" alt="imagem camiseta" />
      <h2 className="mt-10 mb-1.5 font-semibold">T-shirt Luffy Wanted</h2>
      <p className="mb-5">
        Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97% algodão.
      </p>
      <div className="flex justify-between">
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ 69,90
        </p>
        <img
          src="../../public/assets/icone-edicao.svg"
          alt=""
          className="cursor-pointer hover:scale-125 duration-150 "
        />
      </div>
    </section>
  );
}

export default Card;
