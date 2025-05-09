import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalSensors = ({
    isOpen,
    onClose,
    selectedSensor,
    arrow,
    setArrow
}) => {
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


    const newSensor = async () => {

        try {
            await axios.post('http://127.0.0.1:8000/api/sensores',

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

            await axios.put(`http://127.0.0.1:8000/api/sensor/${selectedSensor.id}`,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">
            <div className="bg-emerald-600 w-[30vw] rounded-[36px] shadow-lg">
                
                <div className="flex justify-center items-center">
                    <h2 className="text-white font-bold text-[26px] max-w-[26vw] text-center pt-[6vh] mb-[6vh]">{selectedSensor ? `Editar - ${selectedSensor.sensor}` : "Register!"}</h2>
                </div>
    
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="test_container">
                            <div className="flex justify-center items-center flex-col">

                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={sensor}
                                    placeholder="Sensors name"
                                    onChange={(e) => setSensor(e.target.value)}
                                />
                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={mac_adress}
                                    placeholder="Sensors mac adress"
                                    onChange={(e) => setMacAdress(e.target.value)}
                                />


                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={unidade_med}
                                    placeholder="Sensors unidade med"
                                    onChange={(e) => setUnidadeMed(e.target.value)}
                                />
                                

                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={latitude}
                                    placeholder="Sensors latitude"
                                    onChange={(e) => setLatitude(e.target.value)}
                                />

                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={longitude}
                                    placeholder="Sensors longitude"
                                    onChange={(e) => setLongitude(e.target.value)}
                                />


                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={status}
                                    placeholder="Sensors status"
                                    onChange={(e) => setStatus(e.target.value)}
                                />

                            </div>

                    
                        </div>

                        <div className="flex items-center justify-center">
                            <button id="botao_envioh" 
                                className="bg-sky-500 text-white p-[0.5rem] w-[14vw] rounded-[18px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                                type="submit"
                                onClick={selectedSensor ? editSensor : newSensor}>Salvar
                            </button>
                        </div>

                        <div className="flex items-center justify-center text-white text-2xl pb-[4vh] pt-[4vh]">
                            <button className="duration-75 ease-in-out hover:text-red-300 hover:scale-125 cursor-pointer" onClick={onClose}>X</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}


export default ModalSensors