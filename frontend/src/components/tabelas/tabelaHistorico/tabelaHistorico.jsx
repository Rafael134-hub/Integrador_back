import { MdEdit } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from "axios";


export function TabelaHistóricos({ data, setSelectedHistorico, setModalOpen, setData, setArrow, arrow }) {

    const token = localStorage.getItem("token");

    const delete_historico = async (id) => {
        if (window.confirm("Are u sure?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/historico/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(data.filter((historico) => { historico.id !== id }));
                setArrow(!arrow);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const update_historico = (sensor) => {
        setSelectedHistorico(sensor);
        setModalOpen(true);
    }


    return (
        <table className="bg-white w-full">
            <thead className="text-[20px] font-bold">

                <tr className="border-b-2">
                    <th className="p-5 border-none">SENSOR</th>
                    <th className="p-5 border-none">AMBIENTE</th>
                    <th className="p-5 border-none">DATA E HORA</th>
                    <th className="p-5 border-none">VALOR</th>
                    <th className="p-5 border-none ">AÇÕES</th>
                </tr>

            </thead>
            <tbody
                className="text-[16px]">
                {data.map((historico) => (
                    <tr
                        key={historico.id}
                        className="text-center border-none cursor-pointer hover:bg-[#99FFE1]">

                        <td
                            className="p-5 border-white"
                            onClick={() => update_historico(historico)}>
                            {historico.sensor.sensor}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_historico(historico)}>
                            {historico.ambiente.descricao}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_historico(historico)}>
                            {historico.timestamp}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_historico(historico)}>
                            {historico.valor}
                        </td>


                        <td
                            className="p-6 border-none flex items-center justify-center">

                            <div
                                className="flex items-center justify-between text-2xl w-[90%]">
                                <MdEdit className="cursor-pointer duration-100 ease-in hover:scale-125 hover:text-emerald-800" onClick={() => update_historico(sensor)} />
                                <IoTrashBinSharp className="cursor-pointer duration-100 ease-in hover:scale-125 hover:text-red-700" onClick={() => delete_historico(sensor.id)} />
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}