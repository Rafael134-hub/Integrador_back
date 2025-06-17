import { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

export function ModalAmbientes({
    isOpen,
    onClose,
    selectedAmbiente,
    arrow,
    setArrow
}) {
    if (!isOpen) return null

    const [id, setId] = useState(selectedAmbiente?.id ?? '');
    const [sig, setSig] = useState(selectedAmbiente?.sig ?? '');
    const [ni, setNi] = useState(selectedAmbiente?.ni ?? '');
    const [descricao, setDescricao] = useState(selectedAmbiente?.descricao ?? '');
    const [responsavel, setResponsavel] = useState(selectedAmbiente?.responsavel ?? '');

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()

    }


    const newAmbiente = async () => {

        try {
            await axios.post('http://127.0.0.1:8000/api/ambientes/',

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


    const editAmbiente = async () => {
        try {
            console.log("Data sent to update:", {
                sig: sig,
                descricao: descricao,
                ni: ni,
                responsavel: responsavel
            });

            await axios.put(`http://127.0.0.1:8000/api/ambiente/${selectedAmbiente.id}/`,
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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">

            <form
                onSubmit={handleSubmit}
                className="z-60 bg-white w-[32rem] rounded-[36px] shadow-lg pt-[2rem] flex flex-col items-center justify-center">

                {/* Título do formulário */}
                <span
                    className="font-bold text-[26px] mb-[1rem] place-self-center self-center">
                    {selectedAmbiente ? `Editar ${selectedAmbiente.descricao}` : "Cadastrar novo ambiente!"}
                </span>

                {/* Área dos inputs */}
                <fieldset className="flex items-start justify-center flex-col">

                    <label htmlFor="sig"
                        className="mt-[2rem]">
                        Informe SIG
                    </label>
                    <input
                        name="sig"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={sig}
                        placeholder="SIG do ambiente"
                        onChange={(e) => setSig(e.target.value)}
                    />

                    <label htmlFor="descricao"
                        className="mt-[2rem]">
                        Informe a descrição do ambiente
                    </label>
                    <input
                        name="descricao"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={descricao}
                        placeholder="Descrição do ambiente"
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <label htmlFor="ni"
                        className="mt-[2rem]">
                        Informe o NI do ambiente
                    </label>
                    <input
                        name="ni"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={ni}
                        placeholder="Ni do ambiente"
                        onChange={(e) => setNi(e.target.value)}
                    />

                    <label htmlFor="responsavel"
                        className="mt-[2rem]">
                        Informe o responsável do ambiente
                    </label>
                    <input
                        name="responsavel"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        value={responsavel}
                        placeholder="Responsável do ambiente"
                        onChange={(e) => setResponsavel(e.target.value)}
                    />

                </fieldset>

                {/* Área do botão de salvar */}
                <div className="flex items-center justify-center mt-[3rem]">
                    <button id="botao_envioh"
                        className="bg-black text-white p-[0.5rem] w-[25rem] h-[2.5rem] rounded-[16px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                        type="submit"
                        onClick={selectedAmbiente ? editAmbiente : newAmbiente}>Salvar
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