function CardVazio() {
  return (
    <section className="h-90 w-72   flex  rounded-xl p-3 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
      <label htmlFor="imagem" className="self-center">
        <img
          src="../../public/assets/imagem-vazia.png"
          alt="icone para adicionar uma imagem"
          className="cursor-pointer"
        />
      </label>
      <input type="file" id="imagem" name="imagem" className="hidden" />
      <h2 className="mt-10 mb-1.5 font-semibold">Nome</h2>
      <p className="mb-5">Descrição</p>
      <div className="flex justify-between">
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ - - ,- -
        </p>
      </div>
    </section>
  );
}

export default CardVazio;
