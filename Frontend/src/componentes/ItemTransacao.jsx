import React, { useState } from "react";

function ItemLista(props) {

    const transformDate = (date) => {
        const dateArray = date.split("-");
        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2].split("T")[0];
        const newDate = `${day}/${month}/${year}`;
        return newDate;
    }

    return (
        <div className="border-solid border-b border-cinza-claro cursor-context-menu">
            <ul className="grid grid-cols-7 gap-4 place-items-center rounded-3xl mt-1 mb-1 py-1 cursor-pointer">
                <li className="text-center text-cinza-grafico">{props.name}</li>
                <li className="text-center text-cinza-grafico">{props.quantity}</li>
                <li className="text-center text-cinza-grafico">R${props.price}</li>
                <li className="text-center text-cinza-grafico">R${props.total}</li>
                <li className="text-center text-cinza-grafico">{transformDate(props.datetime)}</li>
                <li className="text-center text-cinza-grafico">{props.id}</li>
                {props.type === "PURCHASE" ? (
                    <li className="text-center text-vermelho-pessego">Compra</li>
                ) : (
                    <li className="text-center text-verde-caqui">Venda</li>
                )}
            </ul>
        </div>
    );
}

export default ItemLista;
