import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function IndexToShop() {
  const location = useLocation();
  const data = location.state;
  console.log(data._id);
  const navigate = useNavigate();

  const [nameItem, setNameItem] = useState('');
  const [descriptionItem, setDescriptionItem] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileUploaded(true);
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAdd = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', data._id);

      try {
        await axios.post('https://sp-items.onrender.com/addItemX', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
            console.log(response.data);
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000); // Mensagem de sucesso desaparece após 3 segundos
          })
          .catch((err) => console.log(err));
        console.log('Arquivo enviado:', file);
      } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
      }
    } else {
      await axios.post('https://sp-items.onrender.com/addItem', {
        nameItem,
        descriptionItem,
        model,
        year,
        image,
        price,
        userId: data._id
      })
        .then((response) => {
          console.log(response.data);
          setSuccessMessage(true);
          setTimeout(() => setSuccessMessage(false), 3000); // Mensagem de sucesso desaparece após 3 segundos
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
        {successMessage && (
          <div className="bg-green-500 text-white text-center py-3 mb-4 rounded-lg">
            Item adicionado com sucesso!
          </div>
        )}
        <h1 className="text-4xl font-bold mb-8 text-orange-500 text-center">Painel Inicial</h1>
        <h2 className="text-2xl font-semibold mb-6 text-orange-500 text-center">Adicione uma nova peça ao repertório</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="file"
            accept=".xlsx"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Nome da peça"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={(e) => setNameItem(e.target.value)}
            disabled={isFileUploaded}
          />
          <input
            type="text"
            placeholder="Descrição da peça"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={(e) => setDescriptionItem(e.target.value)}
            disabled={isFileUploaded}
          />
          <input
            type="text"
            placeholder="Modelo do veículo"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={(e) => setModel(e.target.value)}
            disabled={isFileUploaded}
          />
          <input
            type="number"
            placeholder="Ano"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={(e) => setYear(e.target.value)}
            disabled={isFileUploaded}
          />
          <input
            type="number"
            placeholder="Valor (R$)"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={(e) => setPrice(e.target.value)}
            disabled={isFileUploaded}
          />
          <input
            type="file"
            placeholder="Imagem descritiva"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 hover:bg-orange-50"
            onChange={handleImageChange}
            disabled={isFileUploaded}
          />
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button
            className="w-full md:w-1/2 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-transform duration-300"
            onClick={handleAdd}
          >
            Adicionar Item
          </button>
          <button
            className="w-full md:w-1/2 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/repository', { state: data })}
          >
            Ver todas as peças em seu repertório
          </button>
        </div>
      </div>
    </div>
  );
}
