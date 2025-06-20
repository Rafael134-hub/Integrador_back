import { MdEdit } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from "axios";


export function TabelaAmbientes({ data, setSelectedAmbiente, setModalOpen, setData, setArrow, arrow }) {

    const token = localStorage.getItem("token");

    const delete_ambiente = async (id) => {
        if (window.confirm("Você tem certeza que deseja deletar o registro?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setArrow(!arrow);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const update_ambiente = (ambiente) => {
        setSelectedAmbiente(ambiente);
        setModalOpen(true);
    }


    return (
        <table className="bg-white w-full">
            <thead className="text-[20px] font-bold">

                <tr className="border-b-2">
                    <th className="p-5 border-none">SIG</th>
                    <th className="p-5 border-none">DESCRIÇÃO</th>
                    <th className="p-5 border-none">NI</th>
                    <th className="p-5 border-none">RESPONSÁVEL</th>
                    <th className="p-5 border-none ">AÇÕES</th>
                </tr>

            </thead>
            <tbody
                className="text-[16px]">
                {data.map((ambiente) => (

                    // Linha da tabela com os dados do registro do map
                    <tr
                        tabIndex={0}
                        key={ambiente.id}
                        className="text-center border-none cursor-pointer hover:bg-[#298287] hover:text-white">

                        <td
                            className="p-5 border-white"
                            onClick={() => update_ambiente(ambiente)}>
                            {ambiente.sig}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_ambiente(ambiente)}>
                            {ambiente.descricao}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_ambiente(ambiente)}>
                            {ambiente.ni}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_ambiente(ambiente)}>
                            {ambiente.responsavel}
                        </td>

                        <td
                            className="p-6 border-none flex items-center justify-center">

                            {/* Área com os botões de deletar e editar */}
                            <div
                                className="flex items-center justify-between text-2xl w-[90%]">

                                <button
                                    type="button"
                                    onClick={() => update_ambiente(ambiente)}>
                                    <MdEdit
                                        className="cursor-pointer duration-100 ease-in hover:scale-125" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => delete_ambiente(ambiente.id)}>
                                    <IoTrashBinSharp
                                        className="cursor-pointer duration-100 ease-in hover:scale-125" />
                                </button>
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};