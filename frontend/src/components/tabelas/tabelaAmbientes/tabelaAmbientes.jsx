import { MdEdit } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from "axios";


export function TabelaAmbientes({ data, setSelectedAmbiente, setModalOpen, setData, setArrow, arrow }) {

    const token = localStorage.getItem("token");
    
    const delete_ambiente = async (id) => {
        if (window.confirm("Are u sure?")) {
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
                    <tr
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

                            <div
                                className="flex items-center justify-between text-2xl w-[90%]">
                                <MdEdit className="cursor-pointer duration-100 ease-in hover:scale-125" onClick={() => update_ambiente(ambiente)} />
                                <IoTrashBinSharp className="cursor-pointer duration-100 ease-in hover:scale-125" onClick={() => delete_ambiente(ambiente.id)} />
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}