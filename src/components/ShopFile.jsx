import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShopFile() {
    const location = useLocation();
    const data = location.state;
    const [itemsArray, setItemsArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allItems, setAllItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('https://sp-items.onrender.com/returnShopItems', { id: data._id })
            .then(response => setItemsArray(response.data))
            .catch(err => console.log(err));
    }, [data._id]);

    useEffect(() => {
        axios.post('https://sp-items.onrender.com/returnAllItems')
            .then(response => setAllItems(response.data))
            .catch(err => console.log(err));
    }, []);

    async function handleDelete(description) {
        await axios.post('https://sp-items.onrender.com/deleteItem', { descriptionItem: description, id: data._id })
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    }

    function redirectToEdit(item) {
        navigate('/edit', { state: { item: item, objectUser: data } });
    }

    function viewDetails(item) {
        navigate('/details', { state: {item, objectUser: data} });
    }

    const filteredItems = searchTerm
        ? allItems.filter(item => item.nameItem.toLowerCase().includes(searchTerm.toLowerCase()))
        : itemsArray;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-6">
            <div className="w-full max-w-4xl">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                    <input
                        type="text"
                        placeholder="Buscar peça"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center mb-6">
                    <img src={data.profileImage} alt="Imagem de perfil" className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-4" />
                    <h1 className="text-2xl font-bold text-white">Olá, {data.name}! Seja bem-vindo ao seu perfil!</h1>
                </div>

                <div className="flex gap-4">
                <button className="mb-6 py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300" onClick={() => navigate('/indexToShop', { state: data })}>
                    Adicionar um anúncio
                </button>

                <button className="mb-6 py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300" onClick={() => navigate('/vendas')}>
                    Itens vendidos
                </button>
                </div>

                <h1 className="text-3xl font-bold text-white mb-6">
                    {searchTerm ? "Resultados da pesquisa" : "Peças Anunciadas por você"}
                </h1>
                <div className="Referencia grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <div key={index} className="item bg-white p-5 rounded-xl shadow-xl transform transition duration-300 hover:scale-105">
                            <img src={item.image} alt="Item" className="w-full h-48 object-cover rounded-t-lg mb-4" />
                            <div className="p-4">
                                <h1 className="text-xl font-semibold text-orange-500 mb-2">{item.nameItem}</h1>
                                <h2 className="text-lg text-gray-700 mb-4">Valor: R$ {item.price}</h2>
                                <div className="flex flex-col space-y-3">
                                    {searchTerm ? (
                                        <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300" onClick={() => viewDetails(item)}>
                                            Ver detalhes
                                        </button>
                                    ) : (
                                        <>
                                            <button className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300" onClick={() => redirectToEdit(item)}>
                                                Editar
                                            </button>
                                            <button className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300" onClick={() => handleDelete(item.descriptionItem)}>
                                                Deletar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
