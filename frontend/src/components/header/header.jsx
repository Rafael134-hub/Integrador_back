import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";

export function Header() {

    // Pega o nome do usuário salvo no localStorage
    const username = localStorage.getItem("username");

    const [dataAtual, setDataAtual] = useState(new Date());

    // Pega e formata o mês atual
    const mes = dataAtual.toLocaleString('pt-BR', { month: 'short' }).replace(".", "");

    // Pega e formata o dia atual
    const dia = dataAtual.toLocaleString('pt-BR', { day: '2-digit' });

    // Pega e formata o ano atual
    const ano = dataAtual.toLocaleString('pt-BR', { year: 'numeric' });

    const dataFormatada = `${dia}, ${mes}, ${ano}`;

    // Atualiza a data constantemente a cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
            setDataAtual(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header className="bg-[#298287] pl-[2rem] pr-[2rem] p-[1rem] text-white flex items-center justify-between">

            {/* Área do nome do usuário e ícone */}
            <div className="flex items-center justify-center">
                < FaUser className="h-[2rem] w-[2rem] mr-[1rem]" />

                <div>
                    <p className="font-bold text-[16px]">{username || "Usuário"}</p>
                    <p className="text-[14px]">Admin</p>
                </div>
            </div>

            {/* Área da data e hora */}
            <div className="flex flex-col items-end justify-center">
                <p className="font-bold text-[16px]">{dataAtual.toLocaleTimeString('pt-BR')}</p>
                <p className="text-[14px] capitalize">{dataFormatada}</p>
            </div>


        </header>

    )
}