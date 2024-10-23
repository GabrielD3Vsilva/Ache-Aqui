import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Repository() {
    const location = useLocation();
    const [itemsArray, setItemsArray] = useState([]);
    const data = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('https://sp-items.onrender.com/returnShopItems', { id: data._id })
            .then(response => setItemsArray(response.data))
            .catch(err => console.log(err));
    }, []);


    async function handleDelete (description) {
        await axios.post('https://sp-items.onrender.com/deleteItem', { descriptionItem: description, id: data._id })
        .then((response)=>window.location.reload())
        .catch(err => console.log(err));
    }

    function redirectToEdit (item) {
        navigate('/edit', {state: {item: item, objectUser: data}});
    }
    

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-6">
            <h1 className="text-4xl font-bold text-white mb-8">Peças Anunciadas por você</h1>
            <div className="Referencia grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {itemsArray.map((item, index) => (
                    <div key={index} className="item bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <img src={item.image} alt="Item" className="w-full h-48 object-cover rounded-t-lg mb-4" />
                        <div className="p-4">
                            <h1 className="text-2xl font-semibold text-orange-500 mb-2">{item.nameItem}</h1>
                            <h2 className="text-xl text-gray-700 mb-4">Valor: R$ {item.price}</h2>
                            <div className="flex flex-col space-y-2">
                                <button className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition-colors duration-300" onClick={()=>redirectToEdit(item)}>
                                    Editar
                                </button>

                                <button className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-colors duration-300" onClick={()=>handleDelete(item.descriptionItem)}>
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
