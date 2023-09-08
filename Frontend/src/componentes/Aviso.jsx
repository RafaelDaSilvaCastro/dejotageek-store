function aviso(props) {
  return (
    <main>
      <section class="h-screen font-roboto ">
        <main class="flex flex-col justify-center items-center h-screen">
          <div class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]  rounded-xl bg-branco-hover flex flex-col justify-center items-center ">
            <div className="flex flex-col gap-8 px-10 py-20">
              <img
                src="../../public/assets/icone-email.svg"
                alt="icone de verificado verde"
                className="h-40"
              />
              <h2 className="text-3xl">Verificação de Email </h2>
              <p className="text-cinza-aviso   text-xl text-center">
                {props.mensagem}
              </p>
            </div>
            <button
              onClick={props.onClose}
              className="text-azul-botao font-bold text-2xl border-solid border-t border-cinza-aviso w-full  py-4 "
            >
              <p className="hover:scale-125  duration-150">OK</p>
            </button>
          </div>
        </main>
      </section>
    </main>
  );
}

export default aviso;
