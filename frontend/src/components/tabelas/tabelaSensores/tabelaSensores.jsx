import { MdEdit } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";


export function TabelaSensores({ data, setSelectedSensor, setModalOpen }) {

    const delete_sensor = async (id) => {
        if (window.confirm("Are u sure?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/sensor/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(data.filter((sensor) => { sensor.id !== id }));
                setArrow(!arrow);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const update_sensor = (sensor) => {
        setSelectedSensor(sensor);
        setModalOpen(true);
    }


    return (
        <table className="bg-white w-full">
            <thead className="text-[20px] font-bold">

                <tr className="border-b-2">
                    <th className="p-5 border-none">SENSOR</th>
                    <th className="p-5 border-none">MAC</th>
                    <th className="p-5 border-none">UN. MED</th>
                    <th className="p-5 border-none">LATITUDE</th>
                    <th className="p-5 border-none">LONGITUDE</th>
                    <th className="p-5 border-none">STATUS</th>
                    <th className="p-5 border-none ">AÇÕES</th>
                </tr>

            </thead>
            <tbody 
            className="text-[16px]">
                {data.map((sensor) => (
                    <tr
                        key={sensor.id}
                        className="text-center border-none cursor-pointer hover:bg-[#99FFE1]">

                        <td
                            className="p-5 border-white"
                            onClick={() => update_sensor(sensor)}>
                            {sensor.sensor}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_sensor(sensor)}>
                            {sensor.mac_adress}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_sensor(sensor)}>
                            {sensor.unidade_med}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_sensor(sensor)}>
                            {sensor.latitude}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_sensor(sensor)}>
                            {sensor.longitude}
                        </td>

                        <td
                            className="p-5 border-none"
                            onClick={() => update_sensor(sensor)}>
                            {sensor.status === true ? "Ativo" : "Inativo"}
                        </td>

                        <td
                            className="p-6 border-none flex items-center justify-center">

                            <div
                                className="flex items-center justify-between text-2xl w-[90%]">
                                <MdEdit className="cursor-pointer duration-100 ease-in hover:scale-125 hover:text-emerald-800" onClick={() => update_sensor(sensor)} />
                                <IoTrashBinSharp className="cursor-pointer duration-100 ease-in hover:scale-125 hover:text-red-700" onClick={() => delete_sensor(sensor.id)} />
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}