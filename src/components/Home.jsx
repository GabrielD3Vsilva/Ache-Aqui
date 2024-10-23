import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate( );
    
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    async function handleLogin () {
        await axios.post('https://sp-items.onrender.com/login', 
            {
                email: email, 
                password: password
            }
            )
        .then((response)=>{
            if(response.data.isPremium){
                return navigate('/shopFile', {state: response.data})
            }

            navigate('/client', {state: response.data})})
        .catch((err)=>console.log(err));
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200">
            <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full">
                <h1 className="text-4xl font-bold mb-8 text-orange-500">Login</h1>
                <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button className="w-full py-3 mb-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transform hover:scale-105 transition duration-300 ease-in-out" onClick={()=>handleLogin()}>
                    Entrar
                </button>
                <a href="/register" className="block text-center text-orange-500 hover:underline mt-4">
                    Criar uma conta
                </a>
            </div>
        </div>
    );
}
