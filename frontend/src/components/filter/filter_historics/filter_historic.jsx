import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";
import axios from "axios";

export function FilterHistoricos({
    ambiente,
    setAmbiente,
    sensor,
    setSensor,
    timestamp,
    setTimestemp,
    data,
    setData
}) {

    const [sensores, setSensores] = useState([]);
    const [ambientes, setAmbientes] = useState([]);

    const [openButton, setOpenButton] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {

        if (!token) return;
        console.log("Data: ", data);

        // Pega os sensores
        const fetchSensores = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/sensores/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setSensores(response.data);
                console.log("Dadoohs: ", data);

            } catch (error) {
                console.log(error)
            }
        };

        // Pega os ambientes
        const fetchAmbientes = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ambientes/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setAmbientes(response.data);
                console.log("Dadoohs: ", data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchSensores();
        fetchAmbientes();
    }, []);


    const cleanFilter = () => {
        setAmbiente("");
        setSensor("");
        setTimestemp("");
    };

    return (

        <>
            {/* Botão que ao ser clicado abre o filtro */}
            <button
                className="h-[4rem] w-fit pl-[1rem] pr-[1rem] rounded-xl bg-[#99FFE1] cursor-pointer transition-all duration-300 ease-in-out "
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
                // Verifica se o filtro está aberto
                openFilter ?

                    <form
                        className="bg-[#298287] w-fit absolute mt-[35.5rem] ml-[1rem] p-[1.5rem] pr-[2rem] pl-[2rem] rounded-2xl">

                        {/* Área dos inputs/ campos */}
                        <fieldset
                            className="flex flex-col text-left text-white">

                            <legend
                                className="font-bold text-[20px] mb-[2rem] text-center">Filtrar Históricos
                            </legend>

                            <label htmlFor="timestamp">
                                Informe a data e hora
                            </label>
                            <input
                                id="timestamp"
                                type="datetime-local"
                                value={timestamp}
                                onChange={(e) => setTimestemp(e.target.value)}
                                placeholder="Data e hora"
                                className="bg-white text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                            />

                            <label htmlFor="sensor"
                                className="mt-[2rem]">
                                Informe o sensor selecionado
                            </label>

                            <select
                                id="sensor"
                                value={sensor}
                                onChange={(e) => setSensor(e.target.value)}
                                className="bg-white text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">
                                {/* Itera sobre cada sensor para inserir as opções */}
                                {
                                    sensores.map((sensor, index) => (
                                        <option
                                            key={index}
                                            className="bg-[#298287] text-white"
                                            value={sensor.id}>
                                            {sensor.mac_adress}
                                        </option>
                                    ))}
                            </select>

                            <label htmlFor="ambiente"
                                className="mt-[2rem]">
                                Informe o ambiente selecionado
                            </label>

                            <select
                                id="ambiente"
                                value={ambiente}
                                onChange={(e) => setAmbiente(e.target.value)}
                                className="bg-white text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">

                                {/* Itera sobre cada ambiente para inserir as opções */}
                                {
                                    ambientes.map((ambiente, index) => (
                                        <option
                                            key={index}
                                            className="bg-[#298287] text-white"
                                            value={ambiente.id}>
                                            {ambiente.descricao}
                                        </option>
                                    ))}
                            </select>

                        </fieldset>

                        {/* Área com os botões de fechar filtro e limpar filtros */}
                        <div className="flex items-center justify-between mt-[2.5rem]">
                            <button>
                                <RiResetLeftLine
                                    aria-label="Botão de limpar filtros"
                                    className="text-4xl cursor-pointer"
                                    onClick={cleanFilter} />
                            </button>

                            <button>
                                <IoIosCloseCircle
                                    aria-label="Botão de fechar filtro"
                                    className="text-4xl cursor-pointer"
                                    onClick={() => setOpenFilter(false)} />
                            </button>
                        </div>

                    </form>

                    :

                    // Formulário sem nada caso o filtro esteja fechado
                    <form>
                    </form>
            }

        </>

    )
};
