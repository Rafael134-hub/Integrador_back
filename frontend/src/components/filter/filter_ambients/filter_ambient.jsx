import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";
import axios from "axios";

export function FilterAmbientes({
    sig,
    setSig,
    descricao,
    setDescricao
}) {

    const [openButton, setOpenButton] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const cleanFilter = () => {
        setSig("");
        setDescricao("");
    };

    return (

        <>
            <button
                className="h-[4rem] w-fit pl-[1rem] pr-[1rem] rounded-xl bg-[#99FFE1] cursor-pointer transition-all duration-300 ease-in-out "
                // Ativa o evento de exportação        
                // Define os estados para abir ou fechar o botão
                onClick={openFilter ? () => setOpenFilter(false) : () => setOpenFilter(true)}
                onMouseEnter={() => setOpenButton(true)}
                onFocus={() => setOpenButton(true)}
                onMouseLeave={() => setOpenButton(false)}
                onBlur={() => setOpenButton(false)}>

                <div className=' flex items-center justify-center'>
                    <FaFilter
                        className="text-4xl"
                    />

                    {/* Área do texo do botão, que só é mostrada no hover ou onFocus, e que possui uma transição suave */}
                    <span className={`font-bold transition-all duration-200 ease-in-out overflow-hidden ${openButton ? "opacity-100 max-w-[100%] ml-[1rem]" : "opacity-0 max-w-0 ml-0"}`}>
                        Filtrar Sensores
                    </span>

                </div>

            </button>

            {
                openFilter ?

                    <form
                        className="bg-[#298287] w-fit absolute mt-[28.5rem] ml-[1rem] p-[1.5rem] pr-[2rem] pl-[2rem] rounded-2xl">
                        <fieldset 
                        className="flex flex-col text-left text-white">
                            <legend
                            className="font-bold text-[20px] mb-[2rem] text-center">Filtrar Sensores</legend>

                            <label htmlFor="sig">
                                Informe o SIG do ambiente
                            </label>
                            <input
                                name="sig"
                                type="text"
                                value={sig}
                                onChange={(e) => setSig(e.target.value)}
                                placeholder="SIG"
                                className="bg-white text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]">
                            </input>

                            <label htmlFor="descricao"
                            className="mt-[1rem]">
                                Informe a descrição do ambiente
                            </label>
                            <input
                                name="descricao"
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descrição"
                                className="bg-white text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]">
                            </input>
                         

                        </fieldset>

                        <div className="flex items-center justify-between mt-[2.5rem]">
                            <button>
                                <RiResetLeftLine
                                    className="text-4xl cursor-pointer"
                                    onClick={cleanFilter}/>
                            </button>

                            <button>
                                <IoIosCloseCircle
                                    className="text-4xl cursor-pointer"
                                    onClick={() => setOpenFilter(false)}/>
                            </button>
                        </div>
                        
                    </form>

                    :

                    <form>
                    </form>
            }

        </>

    )
}
