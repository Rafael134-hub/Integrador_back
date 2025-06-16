import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export function BotaoCadastrar({ setOpenModal, tituloBotao, setSelectedSensor }) {

    const [openButton, setOpenButton] = useState(false)


    return (

        <button
            className="h-[4rem] w-fit pl-[1rem] pr-[1rem] rounded-xl bg-[#99FFE1] cursor-pointer transition-all duration-300 ease-in-out "
            // Ativa o evento de exportação
            onClick={() => {
                setSelectedSensor("");
                setOpenModal(true);
            }}

            // Define os estados para abir ou fechar o botão
            onMouseEnter={() => setOpenButton(true)}
            onFocus={() => setOpenButton(true)}
            onMouseLeave={() => setOpenButton(false)}
            onBlur={() => setOpenButton(false)}>

            <div className='flex items-center justify-center h-[4rem]'>
                <FaPlus
                    className="text-4xl"
                />

                {/* Área do texo do botão, que só é mostrada no hover ou onFocus, e que possui uma transição suave */}
                <span className={`font-bold transition-all duration-200 ease-in-out overflow-hidden ${openButton ? "opacity-100 max-w-[100%] ml-[1rem]" : "opacity-0 max-w-0 ml-0"}`}>
                    {`Cadastrar novo ${tituloBotao}`}
                </span>

            </div>

        </button>

    )
}