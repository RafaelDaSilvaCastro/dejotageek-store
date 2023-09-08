function Login() {
  return (
    <section class="h-screen font-roboto">
      <main class="flex flex-col justify-center items-center h-screen">
        <div class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] px-20 rounded-xl py-28 bg-branco-hover flex flex-col justify-center items-center gap-3">
          <div class="flex mb-6">
            <img class="" src="./public/assets/Logo.svg" alt="logo" />
          </div>
          <input
            type="email"
            placeholder="Email"
            class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-xl w-80 text-black bg-branco-fbfbfb mb-2 h-10 px-8 outline-none text-base placeholder-branco-cinza"
          />
          <input
            type="password"
            placeholder="Senha"
            class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-xl w-80 text-black bg-branco-fbfbfb mb-6 h-10 px-8 outline-none text-base placeholder-branco-cinza"
          />
          <button
            class="hover:bg-red-600 bg-vermelho-botao text-white w-80 rounded-xl text-center h-10 text-xl shadow-lg"
            href="./index.html"
          >
            Entrar
          </button>
          <p class="text-sm">
            Esqueci a <u class="text-vermelho-botao">senha</u>
          </p>
        </div>
      </main>
    </section>
  );
}

export default Login;
