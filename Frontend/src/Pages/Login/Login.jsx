import Aviso from "../../componentes/Aviso";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import blogFetch from '../../axios/config.js';

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };


  const fazerLogin = async (e) => {
    e.preventDefault();

    if (email !== '' && senha !== '') {
      try {
       const response = await blogFetch.get(`/usuario/auth/${email}/${senha}`)
        
        console.log(response.data)
        if (response.data === true) {
          console.log('Usuário autenticado com sucesso');
          location.href = '/stock';
          } else {
          console.log('Credenciais inválidas')
          alert('Credenciais inválidas');
        }
      } catch (error) {
        alert('Erro ao enviar requisição para o servidor: '+error )
        console.log('Erro ao enviar requisição para o servidor')
        console.error('Erro ao enviar requisição para o servidor:', error);
      }
    } else {
      console.log('Preencha o email e a senha')
      alert('Preencha o email e a senha');
    }
  };



  const mandarAviso = async () => {
    if (email !== "") {
      try {
        const response = await blogFetch.get(`/usuario/auth/${email}/${senha}`);
        console.log(response.data)
        if (response.status === 200) {
          console.log('Senha enviada para o Email: ', email);
          setMensagem("Senha enviada para o seu Email");
          setMostrarAviso(true);
        } else {
          console.log('Email invalido')
          setMensagem("Email invalido");
          setMostrarAviso(true);
        }
      } catch (error) {
        alert('Erro ao enviar requisição para o servidor')
        console.error('Erro ao enviar requisição para o servidor:', error);
      }
    }
    else {
      console.log('Preencha o Email')
      setMensagem("Preencha o Email");
      setMostrarAviso(true);
    }
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
                onClick={(e) => fazerLogin(e)}
                className="hover:bg-vermelho-botaoHover duration-150 bg-vermelho-botao text-white w-80 rounded-xl text-center h-10 text-xl shadow-lg"
                href="./index.html"
              >
                Entrar
              </button>
            </div>
          </form>
          <p
           onClick={mandarAviso}
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
