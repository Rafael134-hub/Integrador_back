import React, { useState } from "react";
import { Link } from "react-router-dom";
import orbisense from "../../assets/images/logoOrbisense.png";
import { MdHistory, MdHomeFilled, MdPlace, MdOutlineSensors } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { BiSolidMapAlt } from "react-icons/bi";

class ElementoNavegacao {
    constructor(descricao, link, icone) {
        this.descricao = descricao;
        this.link = link;
        this.icone = icone;
    }
}


export function Sidebar({ selectedPage }) {

    const [open, setOpen] = useState(false);

    // Função de encerrar sessão
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
    }

    // Lista com as informações para cada link
    const elementosNavegacao = [
        new ElementoNavegacao("Home", "/home", MdHomeFilled),
        new ElementoNavegacao("Sensores", "/sensores", MdOutlineSensors),
        new ElementoNavegacao("Ambientes", "/ambientes", MdPlace),
        new ElementoNavegacao("Histórico", "/historicos", MdHistory),
        new ElementoNavegacao("Mapa", "/mapa", BiSolidMapAlt)
    ];

    return (
        <>
            {
                // Validação se Sidebar deve ou não abrir
                open === true ?

                    // Sidebar aberta
                    <aside
                        onMouseLeave={() => setOpen(false)}
                        onBlur={() => setOpen(false)}
                        className="h-full bg-white fixed z-50 flex flex-col w-[12rem] transition-all duration-300 ease-in-out transform">

                        {/* Logo da orbisense */}
                        <img
                            className="p-[1rem] mb-[5vh] max-h-full w-[6.5rem] self-center"
                            src={orbisense}
                            alt="Logo da empresa">
                        </img>

                        {/* Área de navegação e de opção de sair, div usada para alinhar elementos */}
                        <div className="flex flex-col items-center justify-between w-full flex-grow">
                            {/* Área de navegação com os links */}
                            <nav
                                className="w-full flex items-center justify-center flex-col">
                                <ul
                                    className="w-full">

                                    {/* Função para iterar sobre cada link na lista para trazer seus respectivos dados */}
                                    {
                                        elementosNavegacao.map((elementoNavegaco, index) => (
                                            <li
                                                className="flex items-center justify-center w-full"
                                                key={index}>

                                                <Link
                                                    to={elementoNavegaco.link}
                                                    className="w-full flex items-center justify-start hover:bg-[#298287] hover:text-white pb-[1.5rem] pt-[1.5rem] pl-[2rem] pr-[2rem] transition-all duration-200 ease-in-out transform">

                                                    <div className="flex items-center justify-between">
                                                        < elementoNavegaco.icone className="h-[2rem]  w-[2rem] mr-[2rem]" />

                                                        <p
                                                            role="link">
                                                            {elementoNavegaco.descricao}
                                                        </p>
                                                    </div>

                                                </Link>

                                            </li>

                                        ))}

                                </ul>

                            </nav>

                            {/* Opção de LogOut/ sair */}
                            <ul className="w-full mb-[2rem]">
                                <li
                                    onClick={logout}
                                    className="w-full flex items-center justify-between pl-[2rem] pr-[2rem] hover:bg-[#298287] hover:text-white pb-[1.5rem] pt-[1.5rem] cursor-pointer transition-all duration-200 ease-in-out transform">

                                    <div className="flex items-center justify-between">
                                        <IoLogOut
                                            className="h-[2rem]  w-[2rem] mr-[2rem]" />

                                        <p>Sair</p>
                                    </div>

                                </li>
                            </ul>

                        </div>
                    </aside>

                    :

                    // Sidebar fechada
                    <aside
                        onMouseEnter={() => setOpen(true)}
                        onFocus={() => setOpen(true)}
                        className="h-full bg-white fixed z-50 flex flex-col w-[6.5rem] transition-all duration-300 ease-in-out transform">

                        {/* Logo da orbisense */}
                        <img
                            className="p-[1rem] mb-[5vh] max-h-full w-[6.5rem]"
                            src={orbisense}
                            alt="Logo da empresa">
                        </img>

                        {/* Área de navegação e de opção de sair, div usada para alinhar elementos */}
                        <div className="flex flex-col items-center justify-between w-full flex-grow">
                            {/* Área de navegação com os links */}
                            <nav
                                className="w-full">
                                <ul>

                                    {/* Função para iterar sobre cada link na lista para trazer seus respectivos dados */}
                                    {
                                        elementosNavegacao.map((elementoNavegaco, index) => (
                                            <li
                                                key={index}>

                                                <Link
                                                    to={elementoNavegaco.link}
                                                    className={selectedPage === elementoNavegaco.descricao ? "w-full flex items-center justify-center bg-[#298287] text-white pb-[1.5rem] pt-[1.5rem] transition-all duration-200 ease-in-out transform" : "w-full flex items-center justify-center hover:bg-[#298287] hover:text-white pb-[1.5rem] pt-[1.5rem] transition-all duration-200 ease-in-out transform"}>
                                                    < elementoNavegaco.icone className="h-[2rem]  w-[2rem]" />
                                                </Link>

                                            </li>

                                        ))}

                                </ul>

                            </nav>

                            {/* Opção de LogOut/ sair */}
                            <ul className="w-full mb-[2rem]">
                                <li
                                    onClick={logout}
                                    className="w-full flex items-center justify-center hover:bg-[#298287] hover:text-white pb-[1.5rem] pt-[1.5rem] cursor-pointer transition-all duration-200 ease-in-out transform">
                                    <IoLogOut
                                        className="h-[2rem]  w-[2rem]" />
                                </li>
                            </ul>

                        </div>
                    </aside>
            }
        </>
    )

}