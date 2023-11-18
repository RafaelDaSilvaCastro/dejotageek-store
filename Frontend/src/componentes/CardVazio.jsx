import React, { useEffect } from 'react';
import { useState } from "react";

function CardVazio(props) {
  const [imagemCompra, setImagemCompra] = useState(
    ""
  );
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemCompra(reader.result);
        props.enviarVariavelImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagemCompra("../../public/assets/imagem-vazia.png");
      props.enviarVariavelImg("../../public/assets/imagem-vazia.png");
    }
  };


  useEffect(() => {
    setImagemCompra(props.imagem)
  }, []);

  return (
    <section className="h-90 w-72   flex  rounded-xl p-3 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] box-border">
      <label htmlFor="imagem" className="self-center">
        <img
          src={imagemCompra}
          alt="icone para adicionar uma imagem"
          className="cursor-pointer w-imagemCard h-imagemCard"
        />
      </label>
      <input
        accept="image/*"
        onChange={handleImageChange}
        type="file"
        id="imagem"
        name="imagem"
        className="hidden"
      />

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

export default CardVazio;
