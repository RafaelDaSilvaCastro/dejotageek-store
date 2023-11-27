import React, { useState } from "react";
import blogFetch from "../../axios/config";
import { format } from "date-fns";

function Promocoes() {

    const [acertos, setAcertos] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const [token] = useState(sessionStorage.getItem("token"));
    const [proudctId, setProductId] = useState(null);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        description: "",
        percentage: "",
        startDate: "",
        endDate: "",
    });

    const [promocoes, setPromocoes] = useState([]);

    const getProducts = async () => {
        try {
            const response = await blogFetch.get(`/products?page=0&size=1150`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                console.log(response.data.content);
                setProducts(response.data.content);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getPromocoes = async () => {
        try {
            const response = await blogFetch.get(`/promotions`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                console.log(response.data.content);
                setPromocoes(response.data.content);
            }

        } catch (err) {
            console.log(err);
        }
    };

    const postPromocoes = async () => {
        try {
            console.log(formData)
            const response = await blogFetch.post(`/promotions/create?productId=${proudctId}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
                });

            if (response.status === 204) {
                console.log(response.data);
                setAcertos(true);
                setMensagem("Promoção cadastrada com sucesso!");
                setTimeout(() => {
                    setAcertos(false);
                }, 3000);
                getPromocoes();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.description &&
            formData.percentage &&
            formData.startDate &&
            formData.endDate
        ) {
            setPromocoes((prevPromocoes) => [
                ...prevPromocoes,
                {
                    ...formData,
                    startDate: format(new Date(formData.startDate), "yyyy/MM/dd"),
                    endDate: format(new Date(formData.endDate), "yyyy/MM/dd"),
                },
            ]);

            setFormData({
                description: "",
                percentage: "",
                startDate: "",
                endDate: "",
            });
        }

        postPromocoes();
    };

    React.useEffect(() => {
        getProducts();
        getPromocoes();
    }, []);

    const transformDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="flex">
            {/* Formulário à esquerda */}
            <div className="flex-1 p-4 bg-gray-200">
                <h1 className="text-2xl mb-4 font-bold">Criar Promoção</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="productId" className="block text-sm font-medium text-gray-600">
                            Produto:
                        </label>
                        <input
                            className="outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                            placeholder="Nome"
                            type="text"
                            name="nome"
                            id="productId"
                            list="productsList"
                            required
                            onChange={async (e) => {
                                const selectedItem = products.find(item => item.name === e.target.value);
                                if (selectedItem) {
                                    setProductId(selectedItem.id);
                                };

                            }}
                        />
                        <datalist id="productsList">
                            {products && products.map(item => (
                                <option key={item.id} value={item.name} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                            Descrição:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="percentage" className="block text-sm font-medium text-gray-600">
                            Porcentagem:
                        </label>
                        <input
                            type="text"
                            id="percentage"
                            name="percentage"
                            value={formData.percentage}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
                            Data de Início:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
                            Data de Término:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <button 
                    type="submit" 
                    className="bg-vermelho-botao text-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-4 py-3 flex items-center hover:scale-105 duration-150">
                        Adicionar Promoção
                    </button>
                </form>
            </div >

            {/* Lista de promoções à direita */}
            < div className="flex-1 p-4 bg-gray-100" >
                <h1 className="text-2xl mb-4 font-bold">Promoções Cadastradas</h1>
                <ul className="list-disc list-inside">
                    {promocoes.map((promocao, index) => (
                        <li key={index} className="mb-2">
                            <strong>{promocao.description}</strong> de {promocao.percentage}% de desconto para o produto {promocao.productName}
                            <br />
                            Válido de {transformDate(promocao.startDate)} até {transformDate(promocao.endDate)}
                        </li>
                    ))}
                </ul>
            </div >
            {acertos && (
          <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded shadow-lg z-50">
            <p>{mensagem}</p>
          </div>
        )}
        </div >
    );
}

export default Promocoes;
