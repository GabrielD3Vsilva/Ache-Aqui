import { useState, useEffect } from "react";
import axios from "axios";

export default function Compras() {
    const [sales, setSales] = useState([]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 p-6">
            <div className="w-full max-w-4xl">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                    <h1 className="text-3xl font-bold text-orange-500 mb-6">Compras recentes</h1>
                    {sales.length === 0 ? (
                        <p className="text-center text-gray-700 text-xl">Não há compras atuais</p>
                    ) : (
                        <ul className="space-y-4">
                            {sales.map((sale, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <h2 className="text-lg font-semibold text-orange-500">{sale.itemName}</h2>
                                    <p className="text-gray-700">Valor: R$ {sale.price}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
