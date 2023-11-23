import Aviso from "../../componentes/Aviso";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogFetch from '../../axios/config.js';

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarAviso, setMostrarAviso] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const navigate = useNavigate();

  const postLogin = async () => {
    try {
      const response = await blogFetch.post("/auth/signin", { username: email, password: senha });

      if (response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem('token', token)
        navigate('/stock')
      }
    }
    catch (errr) {
      if (errr.response.status === 422) {
        setErro(true);
        setMensagemErro(errr.response.data.errors[0].message);
        console.log(errr.response.data);
        setTimeout(() => {
          setErro(false);
        }, 3000);
      }
    }
  }

  const handleLoginForm = (e) => {
    e.preventDefault();

    postLogin();
  };

  return (
    <section className="h-screen font-roboto">
      <main
        className={
          mostrarAviso === true
            ? "hidden"
            : "flex flex-col justify-center items-center h-screen"
        }
      >
        {erro && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded shadow-lg z-50">
            <p>{mensagemErro}</p>
          </div>
        )}
        <div className="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] px-20 rounded-xl py-28 bg-branco-hover flex flex-col justify-center items-center gap-3">
          <div className="flex mb-6">
            <img className="" src="./public/assets/Logo.svg" alt="logo" />
          </div>
          <form action="" className="flex flex-col gap-3" id="form-login">
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email"
              className="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-xl w-80 text-black bg-branco-fbfbfb mb-2 h-10 px-8 outline-none text-base placeholder-branco-cinza"
            />
            <input
              onChange={(e) => setSenha(e.target.value)}
              name="password"
              type="password"
              placeholder="Senha"
              className="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-xl w-80 text-black bg-branco-fbfbfb mb-6 h-10 px-8 outline-none text-base placeholder-branco-cinza"
            />
            <div>
              <button
                onClick={(e) => handleLoginForm(e)}
                disabled={email === "" || senha === ""}
                className={`${email === "" || senha === ""
                    ? "bg-gray-400 text-white w-80 rounded-xl text-center h-10 text-xl shadow-lg cursor-not-allowed"
                    : "hover:bg-vermelho-botaoHover duration-150 bg-vermelho-botao text-white w-80 rounded-xl text-center h-10 text-xl shadow-lg"
                  }`}
              >
                Entrar
              </button>
            </div>
          </form>
          <p
            id="esqueciSenha"
            className="text-sm cursor-pointer hover:scale-125  duration-150"
          >
            Esqueci a{" "}
            <u className="text-vermelho-botao hover:text-vermelho-botaoHover">
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
