import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Details() {
  const location = useLocation();
  const data = location.state;

  async function handlePay( )
  {

    console.log(data.item, data.objectUser)
      await axios.post('https://sp-items.onrender.com/handlePay', 
        {
          item: data.item,
          payer: data.objectUser
        }
      ).then((response)=>{window.location.href = response.data})
      .catch((err)=>console.log(err));

  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-6">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl mx-auto my-12">
        <div className="flex flex-col md:flex-row items-center">
          <img src={data.item.image} alt="image product" className="w-full max-w-xs h-auto rounded-xl mb-8 md:mb-0 md:mr-8 shadow-lg transform transition duration-300 hover:scale-105" />
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center md:text-left truncate">{data.item.nameItem}</h1>
            <h2 className="text-2xl font-semibold text-orange-600 mb-2 truncate">Modelo: {data.item.model}</h2>
            <h2 className="text-2xl font-semibold text-orange-600 mb-2 truncate">Ano: {data.item.year}</h2>
            <h2 className="text-2xl font-semibold text-orange-600 mb-2 truncate">Valor: R$ {data.item.price}</h2>
            <h2 className="text-2xl font-semibold text-orange-600 mb-2 truncate">contato: {data.item.tel}</h2>
            <button className="py-2 px-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transform transition duration-300 hover:scale-105" onClick={()=> handlePay()}>
              Comprar
            </button>
          </div>
        </div>
        <p className="text-lg text-gray-700 text-center leading-relaxed mt-6">{data.item.descriptionItem}</p>
      </div>
    </div>
  );
}
