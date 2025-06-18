import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

export function ModalHistoricos({
    isOpen,
    onClose,
    selectedHistorico,
    arrow,
    setArrow
}) {
    if (!isOpen) return null

    const [id, setId] = useState(selectedHistorico?.id ?? '');
    const [idSensor, setIdSensor] = useState(selectedHistorico?.id_sensor ?? '');
    const [idAmbiente, setIdAmbiente] = useState(selectedHistorico?.id_ambiente ?? '');
    const [valor, setValor] = useState(selectedHistorico?.valor ?? '');
    const [timestamp, setTimestamp] = useState(selectedHistorico?.timestamp ?? '');
    const [sensores, setSensores] = useState([]);
    const [ambientes, setAmbientes] = useState([]);

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()

    }


    useEffect(() => {

        if (!token) return;

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


    const newHistorico = async () => {

        try {
            await axios.post('http://127.0.0.1:8000/api/historicos/',

                {
                    id_sensor: idSensor,
                    id_ambiente: idAmbiente,
                    valor: valor,
                    timestamp: timestamp

                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            console.log("Dados inseridos com sucesso");
            setArrow(!arrow);
            onClose(true);
        } catch (error) {
            console.error("Erro ao inserir ambiente:", error);
            console.error("Detalhes do erro:", error.response?.data || error.message);
        }
    };


    const editHistorico = async () => {
        try {

            await axios.put(`http://127.0.0.1:8000/api/historico/${selectedHistorico.id}/`,
                {
                    id_sensor: idSensor,
                    id_ambiente: idAmbiente,
                    valor: valor,
                    timestamp: timestamp
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Data update was succesfull");
            setArrow(!arrow);
            onClose(true);
        } catch (error) {
            console.error("Error while updating ambient:", error.response?.data || error.message);
        }
    };

    function formatarParaInput(datetimeString) {
        const date = new Date(datetimeString);
        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 16);
    };

    const tituloData = new Date(timestamp);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">

            <form
                onSubmit={handleSubmit}
                className="z-60 bg-white w-[32rem] rounded-[36px] shadow-lg pt-[2rem] flex flex-col items-center justify-center">

                {/* Título do formulário */}
                <span
                    className="font-bold text-[26px] mb-[1rem] place-self-center self-center">
                    {selectedHistorico ? `Editar ${tituloData.toLocaleString('pt-BR').replace(",", "")}` : "Cadastrar novo histórico!"}
                </span>

                {/* Área dos inputs */}
                <fieldset className="flex items-start justify-center flex-col">

                    <label htmlFor="timestamp">
                        Informe a data e hora
                    </label>
                    <input
                        name="timestamp"
                        type="datetime-local"
                        value={timestamp ? formatarParaInput(timestamp) : ""}
                        onChange={(e) => setTimestamp(e.target.value)}
                        placeholder="Data e hora"
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]">
                    </input>


                    <label htmlFor="valor"
                        className="mt-[2rem]">
                        Informe o valor
                    </label>
                    <input
                        name="valor"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="Valor de registro"
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]">
                    </input>


                    <label htmlFor="sensor"
                        className="mt-[2rem]">
                        Informe o sensor selecionado
                    </label>

                    <select
                        name="sensor"
                        value={idSensor}
                        onChange={(e) => setIdSensor(e.target.value)}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">
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
                        name="ambiente"
                        value={idAmbiente}
                        onChange={(e) => setIdAmbiente(e.target.value)}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">
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

                {/* Área do botão de salvar */}
                <div className="flex items-center justify-center mt-[3rem]">
                    <button id="botao_envioh"
                        className="bg-black text-white p-[0.5rem] w-[25rem] h-[2.5rem] rounded-[16px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                        type="submit"
                        onClick={selectedHistorico ? editHistorico : newHistorico}>Salvar
                    </button>
                </div>

                {/* Área do botão de fechar modal */}
                <div className="flex items-center justify-center text-2xl pb-[4vh] pt-[4vh]">
                    <button
                        className="duration-75 ease-in-out hover:scale-125 cursor-pointer"
                        onClick={onClose}>
                        < IoIosCloseCircle
                            className="text-5xl"
                        />
                    </button>
                </div>

            </form>
        </div>
    )
}