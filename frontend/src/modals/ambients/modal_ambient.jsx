import React, { useState } from "react";
import axios from "axios";

const ModalAmbients = ({
    isOpen,
    onClose,
    selectedAmbient,
    arrow,
    setArrow
}) => {
    if (!isOpen) return null

    const [id, setId] = useState(selectedAmbient?.id ?? '');
    const [sig, setSig] = useState(selectedAmbient?.sig ?? '');
    const [ni, setNi] = useState(selectedAmbient?.ni ?? '');
    const [descricao, setDescricao] = useState(selectedAmbient?.descricao ?? '');
    const [responsavel, setResponsavel] = useState(selectedAmbient?.responsavel ?? '');

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()

    }


    const newAmbient = async () => {

        try {
            await axios.post('http://127.0.0.1:8000/api/ambientes',

                {
                    sig: parseInt(sig),
                    descricao: descricao,
                    ni: ni,
                    responsavel: responsavel
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


    const editAmbient = async () => {
        try {
            console.log("Data sent to update:", {
                sig: sig,
                descricao: descricao,
                ni: ni,
                responsavel: responsavel
            });

            await axios.put(`http://127.0.0.1:8000/api/ambiente/${selectedAmbient.id}`,
                {
                    sig: sig,
                    descricao: descricao,
                    ni: ni,
                    responsavel: responsavel
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">
            <div className="bg-emerald-600 w-[30vw] rounded-[36px] shadow-lg">
                
                <div className="flex justify-center items-center">
                    <h2 className="text-white font-bold text-[26px] max-w-[26vw] text-center pt-[6vh] mb-[6vh]">{selectedAmbient ? `Editar - ${selectedAmbient.descricao}` : "Register!"}</h2>
                </div>
    
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="test_container">
                            <div className="flex justify-center items-center flex-col">

                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={sig}
                                    type="number"
                                    placeholder="Ambient sig"
                                    onChange={(e) => setSig(e.target.value)}
                                />

                                
                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={ni}
                                    placeholder="Ambient ni"
                                    onChange={(e) => setNi(e.target.value)}
                                />


                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[3vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={descricao}
                                    placeholder="Ambient description"
                                    onChange={(e) => setDescricao(e.target.value)}
                                />


                                <input
                                    className="bg-emerald-100 w-[24vw] rounded-[6px] p-2 mb-[8vh] duration-50 ease-in-out focus:outline-none hover:bg-emerald-300"
                                    value={responsavel}
                                    placeholder="Ambient's responsable"
                                    onChange={(e) => setResponsavel(e.target.value)}
                                />


                            </div>

                    
                        </div>

                        <div className="flex items-center justify-center">
                            <button id="botao_envioh" 
                                className="bg-sky-500 text-white p-[0.5rem] w-[14vw] rounded-[18px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                                type="submit"
                                onClick={selectedAmbient ? editAmbient : newAmbient}>Salvar
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


export default ModalAmbients