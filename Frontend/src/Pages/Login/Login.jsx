import Aviso from "../../componentes/Aviso";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const mandarAviso = (event) => {
    if (email !== "") {
      setMensagem("Senha enviada para o seu Email");
      setMostrarAviso(true);
    } else {
      setMensagem("Insira o Email");
      setMostrarAviso(true);
    }
  };

  return (
    <section class="h-screen font-roboto">
      <main
        class={
          mostrarAviso === true
            ? "hidden"
            : "flex flex-col justify-center items-center h-screen"
        }
      >
        <div class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] px-20 rounded-xl py-28 bg-branco-hover flex flex-col justify-center items-center gap-3">
          <div class="flex mb-6">
            <img class="" src="./public/assets/Logo.svg" alt="logo" />
          </div>
          <form action="" className="flex flex-col gap-3" id="form-login">
            <input
              onChange={(event) => {
                const novoEmail = event.target.value;
                setEmail(novoEmail);
              }}
              name="email"
              type="email"
              placeholder="Email"
              class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-xl w-80 text-black bg-branco-fbfbfb mb-2 h-10 px-8 outline-none text-base placeholder-branco-cinza"
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              class="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-xl w-80 text-black bg-branco-fbfbfb mb-6 h-10 px-8 outline-none text-base placeholder-branco-cinza"
            />
            <div>
              <Link to="/stock">
                <button
                  class="hover:bg-vermelho-botaoHover duration-150 bg-vermelho-botao text-white w-80 rounded-xl text-center h-10 text-xl shadow-lg"
                  href="./index.html"
                >
                  Entrar
                </button>
              </Link>
            </div>
          </form>
          <p
            onClick={mandarAviso}
            id="esqueciSenha"
            class="text-sm cursor-pointer hover:scale-125  duration-150"
          >
            Esqueci a{" "}
            <u class="text-vermelho-botao hover:text-vermelho-botaoHover">
              senha
            </u>
          </p>
        </div>
      </main>
      {mostrarAviso && (
        <Aviso mensagem={mensagem} onClose={() => setMostrarAviso(false)} />
      )}
    </section>
  );
}

export default Login;
