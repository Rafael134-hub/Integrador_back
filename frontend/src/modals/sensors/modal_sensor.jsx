import { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

export function ModalSensores({
    isOpen,
    onClose,
    selectedSensor,
    arrow,
    setArrow
}) {
    if (!isOpen) return null

    const [id, setId] = useState(selectedSensor?.id ?? '');
    const [sensor, setSensor] = useState(selectedSensor?.sensor ?? '');
    const [mac_adress, setMacAdress] = useState(selectedSensor?.mac_adress ?? '');
    const [unidade_med, setUnidadeMed] = useState(selectedSensor?.unidade_med ?? '');
    const [latitude, setLatitude] = useState(selectedSensor?.latitude ?? '');
    const [longitude, setLongitude] = useState(selectedSensor?.longitude ?? '');
    const [status, setStatus] = useState(selectedSensor?.status ?? '');

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    // Função de novo sensor da modal
    const newSensor = async () => {

        try {
            await axios.post('http://127.0.0.1:8000/api/sensores/',

                {
                    sensor: sensor,
                    mac_adress: mac_adress,
                    unidade_med: unidade_med,
                    latitude: latitude,
                    longitude: longitude,
                    status: status,
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
            console.error("Erro ao inserir sensor:", error);
            console.error("Detalhes do erro:", error.response?.data || error.message);
        }
    };

    // Função de put da modal
    const editSensor = async () => {
        try {
            console.log("Data sent to update:", {
                sensor: sensor,
                mac_adress: mac_adress,
                unidade_med: unidade_med,
                latitude: latitude,
                longitude: longitude,
                status: status,
            });

            await axios.put(`http://127.0.0.1:8000/api/sensor/${selectedSensor.id}/`,
                {
                    sensor: sensor,
                    mac_adress: mac_adress,
                    unidade_med: unidade_med,
                    latitude: latitude,
                    longitude: longitude,
                    status: status,
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
            console.error("Error while updating sensor:", error.response?.data || error.message);
        }
    };

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">

            <form
                onSubmit={handleSubmit}
                className="z-60 bg-white w-[32rem] rounded-[36px] shadow-lg pt-[2rem] flex flex-col items-center justify-center">

                {/* Título do formulário */}
                <span
                    className="font-bold text-[26px] mb-[2rem] place-self-center self-center">
                    {selectedSensor ? `Editar ${selectedSensor.mac_adress}` : "Cadastrar novo sensor!"}
                </span>

                {/* Área dos inputs */}
                <fieldset className="flex items-start justify-center flex-col">

                    <label htmlFor="sensor">
                        Informe o Tipo de sensor
                    </label>

                    <select
                        value={sensor}
                        onChange={(e) => setSensor(e.target.value)}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">

                        <option value="" disabled>
                            Selecione um tipo
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"temperatura"}>
                            Temperatura
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"umidade"}>
                            Umidade
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"luminosidade"}>
                            Luminosidade
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"contador"}>
                            Contador
                        </option>
                    </select>

                    <label htmlFor="macAddress"
                        className="mt-[1rem]">
                        Informe o Mac Address
                    </label>
                    <input
                        name="macAddress"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={mac_adress}
                        placeholder="Mac Address do sensor"
                        onChange={(e) => setMacAdress(e.target.value)}
                    />

                    <label htmlFor="medida"
                        className="mt-[1rem]">
                        Informe a unidade de medida
                    </label>
                    <input
                        name="medida"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={unidade_med}
                        placeholder="Uni. de medida"
                        onChange={(e) => setUnidadeMed(e.target.value)}
                    />

                    <label htmlFor="latitude"
                        className="mt-[1rem]">
                        Informe a latitude
                    </label>
                    <input
                        name="latitude"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={latitude}
                        placeholder="Latitude do sensor"
                        onChange={(e) => setLatitude(e.target.value)}
                    />

                    <label htmlFor="longitude"
                        className="mt-[1rem]">
                        Informe a longitude
                    </label>
                    <input
                        name="longitude"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={longitude}
                        placeholder="Longitude do sensor"
                        onChange={(e) => setLongitude(e.target.value)}
                    />

                    <label htmlFor="status"
                        className="mt-[2rem]">
                        Informe o Status
                    </label>

                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">
                        <option
                            className="bg-[#298287] text-white"
                            value={true}>
                            Ativo
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={false}>
                            Inativo
                        </option>
                    </select>

                </fieldset>

                {/* Área do botão de salvar */}
                <div className="flex items-center justify-center mt-[2rem]">
                    <button id="botao_envioh"
                        className="bg-black text-white p-[0.5rem] w-[25rem] h-[2.5rem] rounded-[16px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                        type="submit"
                        onClick={selectedSensor ? editSensor : newSensor}>Salvar
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