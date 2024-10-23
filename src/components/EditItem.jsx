import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export default function EditItem () {
    const location = useLocation();
    const navigate = useNavigate();

    const [nameItem, setNameItem] = useState('');
    const [descriptionItem, setDescriptionItem] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');

    const data = location.state;

    console.log(data.objectUser._id);

    async function handleEdit () {

        const item = {
            nameItem: nameItem,
            descriptionItem: descriptionItem,
            model: model,
            year: year,
            price: price,
        }

        await axios.post('https://sp-items.onrender.com/editItem', 
            {
                id: data.objectUser._id,
                item: item,
                descriptionItem: data.item.descriptionItem
            }   
        )
        .then((response)=>navigate('/repository', {state: response.data}))
        .catch((err)=>console.log(err));

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-4">
            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <h1 className="text-4xl font-bold mb-8 text-orange-500 text-center">Edite o item</h1>
                <h2 className="text-2xl font-semibold mb-6 text-orange-500 text-center"></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        
                        placeholder="Nome da peça"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
                        onChange={(e)=>setNameItem(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descrição da peça"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
                        onChange={(e)=>setDescriptionItem(e.target.value)}
                        
                    />
                    <input
                        type="text"
                        placeholder="Modelo do veículo"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
                        onChange={(e)=>setModel(e.target.value)}
                        
                    />
                    <input
                        type="number"
                        placeholder="Ano"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
                        onChange={(e)=>setYear(e.target.value)}
                        
                    />
                    <input
                        type="number"
                        placeholder="Valor (R$)"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
                        onChange={(e)=>setPrice(e.target.value)}
                        
                    />
                </div>


                <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <button
                        className="w-full md:w-1/2 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-transform duration-300"
                        onClick={()=>handleEdit()}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}