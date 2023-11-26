import React from "react";
import blogFetch from "../../axios/config";

import FiltroDashboard from "../../componentes/FiltroDashboard";
import GraficoPizza from "../../componentes/GraficoPizza";

import ItemTransacao from "../../componentes/ItemTransacao";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [token] = useState(sessionStorage.getItem("token"));
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const getTransactions = async () => {
    try {
      const response = await blogFetch.get(`/transactions?filter=${filter}?page=${page}`, { headers: { Authorization: `Bearer ${token}` } });

      if (response.status === 200) {
        setTransactions(response.data.content);
        console.log(response.data.content);
      }

    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
    }
  }

  React.useEffect(() => {
    getTransactions();
  }, [filter, page]);

  return (
    <div className="flex flex-col">
      <FiltroDashboard />
      <div className="flex flex-col mt-12 gap-y-4 py-4 bg-white rounded-xl drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-evenly py-6 mr-36 gap-x-24">
          <h2 className="text-xl">Vendas</h2>
          <h2 className="text-xl">Compras</h2>
        </div>
        <div className="w-auto h-0.5 bg-cinza-barra mx-36"></div>
        <div className="flex items-center justify-evenly mx-36">
          <GraficoPizza />
          <GraficoPizza />
        </div>
      </div>
      <div className="flex flex-col mt-12 mb-8 gap-y-4 p-16 bg-white rounded-xl drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between px-8">
          <h2 className="text-cinza-grafico font-semibold">Transações</h2>
        </div>
        <div className="mb-36">
          <ul className="grid grid-cols-7 gap-4 justify-items-center items-center border-b border-cinza-claro pt-16 pb-2">
            <li className="">Produto</li>
            <li className="">Quantidade</li>
            <li className="">Preço</li>
            <li className="">Total</li>
            <li className="">Data</li>
            <li className="">Id</li>
            <li className="">Tipo</li>
          </ul>
          {transactions.map((transaction) => (
            <ItemTransacao
              key={transaction.id}
              name={transaction.productName}
              quantity={transaction.quantity}
              price={transaction.price}
              total={transaction.total}
              datetime={transaction.datetime}
              id={transaction.id}
              type={transaction.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
