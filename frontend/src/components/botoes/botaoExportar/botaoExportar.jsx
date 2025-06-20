import axios from 'axios';
import { useState } from 'react';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

export function BotaoExportar({ urlExportar, nomePlanilha, tituloBotao }) {

    const token = localStorage.getItem("token");
    const [openButton, setOpenButton] = useState(false)

    const exportData = async () => {
        try {
            const response = await axios.get(urlExportar, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nomePlanilha}.xlsx`);
            document.body.appendChild(link);
            link.click();

            link.remove();
        } catch (error) {
            console.error("Erro ao exportar dados:", error);
        }
    };

    return (

        <button
            className="h-[4rem] w-fit pl-[1rem] pr-[1rem] rounded-xl bg-[#99FFE1] cursor-pointer transition-all duration-300 ease-in-out "
            // Ativa o evento de exportação
            onClick={exportData}

            // Define os estados para abir ou fechar o botão
            onMouseEnter={() => setOpenButton(true)}
            onFocus={() => setOpenButton(true)}
            onMouseLeave={() => setOpenButton(false)}
            onBlur={() => setOpenButton(false)}>

            <div className=' flex items-center justify-center'>
                <PiMicrosoftExcelLogoFill
                    className="text-4xl"
                />

                {/* Área do texo do botão, que só é mostrada no hover ou onFocus, e que possui uma transição suave */}
                <span className={`font-bold transition-all duration-200 ease-in-out overflow-hidden ${openButton ? "opacity-100 max-w-[100%] ml-[1rem]" : "opacity-0 max-w-0 ml-0"}`}>
                    {`Exportar ${tituloBotao}`}
                </span>

            </div>

        </button>

    )
};