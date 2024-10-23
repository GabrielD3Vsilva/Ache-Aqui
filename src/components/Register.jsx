import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [selectedPlan, setSelectedPlan] = useState('free');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bairro, setBairro] = useState('');
    const [tel, setTel] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null); // Estado para armazenar a imagem
    const [pix, setPix] = useState('');

    async function handleRegister() {
        const isPremium = validatePremium();
        await axios.post('https://sp-items.onrender.com/register', {
            isPremium: isPremium,
            password: password,
            name: name,
            email: email,
            bairro: bairro,
            tel: tel,
            cnpj: cnpj,
            address: address,
            number: number,
            city: city,
            pix: pix,
            profileImage: profileImage // Enviando a imagem em string
        }).then((response) => {
            console.log(response.data);
            // Redirecionar para o link fornecido na resposta
            window.location.href = response.data;
        }).catch((err) => console.log(err));
    }

    function validatePremium() {
        return selectedPlan !== 'free';
    }

    // Função para converter a imagem em base64
    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">
                <h1 className="text-4xl font-bold mb-8 text-orange-500 text-center">Registro</h1>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Nome"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Chave Pix para receber pagamentos"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setPix(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="CNPJ ou CPF"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setCnpj(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Telefone"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setTel(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Endereço"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setAddress(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="N"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setNumber(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Bairro"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setBairro(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Cidade"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            onChange={(e)=>setCity(e.target.value)}
                        />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 text-orange-500">Imagem de perfil</h2>
                    <input
                        type="file"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={handleFileChange}
                    />
                    <h2 className="text-2xl font-semibold mb-4 text-orange-500">Plano</h2>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="freePlan"
                            name="plan"
                            value="free"
                            checked={selectedPlan === 'free'}
                            onChange={() => setSelectedPlan('free')}
                            className="mr-2"
                        />
                        <label htmlFor="freePlan" className="text-lg font-medium text-gray-700">100% gratuito</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="premiumPlan"
                            name="plan"
                            value="premium"
                            checked={selectedPlan === 'premium'}
                            onChange={() => setSelectedPlan('premium')}
                            className="mr-2"
                        />
                        <label htmlFor="premiumPlan" className="text-lg font-medium text-gray-700">
                            Premium + perfil de produtos da loja (R$ 14,90)
                        </label>
                    </div>
                    <button onClick={handleRegister} className="w-full py-3 mt-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transform hover:scale-105 transition duration-300 ease-in-out">
                        Confirmar Cadastro
                    </button>
                    
                    <a href="/" className="block text-center text-orange-500 hover:underline mt-4">
                        Voltar para Login
                    </a>
                </div>
            </div>
        </div>
    );
}
