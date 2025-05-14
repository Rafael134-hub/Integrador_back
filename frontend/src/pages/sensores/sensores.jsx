import React, {useState, useEffect} from "react";
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaFilter} from 'react-icons/fa'
import {Link} from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ModalSensors from "../../modals/sensors/modal_sensor";
import FilterSensors from "../../components/filter/filter_sensors/filter_sensors";

export default function Sensores(){

    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const token = localStorage.getItem('token');
    const [arrow, setArrow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterlOpen, setFilterlOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [arrow2, setArrow2] = useState(false);;

    useEffect(() => {

        if (!token) return;
        console.log("Data: ", data);
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/sensores/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(response.data);
                setOriginalData(response.data)
                console.log("Datah: ", data);
                
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, [arrow])

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
                setData(data.filter((sensor) => { sensor.id !== id }))
                setArrow(!arrow)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const create_sensor = async(newSensor)=>{
        console.log("New sensor: ", newSensor)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/sensores/',
                
                {   
                    sensor: newSensor.sensor,
                    mac_adress: newSensor.mac_adress,
                    unidade_med: newSensor.unidade_med,
                    latitude: newSensor.latitude,
                    longitude: newSensor.longitude,
                    status: newSensor.status,

                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Data insert was succesfull!", response.data)
            setData(...data, newSensor)
            setModalOpen(false)
            setArrow(!arrow)
        } catch (error) {
            console.error(error)
        }

    }

    const update_sensor = (sensor)=>{
        setSelectedSensor(sensor)
        setModalOpen(true)
    }


    return(
        <>
            <Header/>

            <main>
                <section>
                    <h1 className="text-[40px] font-bold text-center mt-[6vh] text-sky-600 mb-[8vh]">Sensors!</h1>

                    <div className="flex items-center justify-center mb-[4vh]">
                        <div className="w-[80vw] flex items-center justify-between cursor-pointer">

                            <div>
                                
                                <div className="flex items-center justify-between w-[6.6vw] rounded-2xl p-3 duration-200 hover:bg-emerald-100 hover:scale-110 hover:ml-1" onClick={()=>{
                                    filterlOpen == false?
                                    setFilterlOpen(true)
                                    
                                    :setFilterlOpen(false);
                                
                                    }}>

                                    <FaFilter className="text-teal-700 text-2xl duration-150 ease-in-out hover:scale-115"></FaFilter>
                                    <p className="text-xl hover:text-teal-900">Filter</p>
                                </div>  

                                <FilterSensors
                                    isFilterOpen={filterlOpen}
                                    originalDataFilter = {originalData}
                                    dadosFilter = {data}
                                    setDadosFilter={setData}
                                    onFilterClose={()=>setFilterlOpen(false)}
                                    token = {token}
                                />
                                
                            </div>

                            <div className="flex items-center justify-between w-[15.4vw] rounded-2xl p-2 duration-200 ease-in-out hover:bg-emerald-100 hover:scale-110" onClick={()=>{setModalOpen(true), setSelectedSensor(null)}}>
                                <p className="text-xl hover:text-teal-900">Register new Sensor</p>
                                <FaPlus className="text-teal-700 text-2xl duration-150 ease-in-out hover:scale-120" />
                            </div>

                        </div>
                        
                    </div>
                    
                    <div className="mb-[26vh]">
                        <div className="flex justify-center items-center">
                            <div className="rounded-4xl">
                                <table className="w-[80vw]">
                                <thead className="border-b-2 text-[18px] font-normal text-white bg-teal-700">
            
                                        <tr>
                                            <th className="p-5 border-r-2 border-gray-200">EDIT</th>
                                            <th className="p-5 border-r-2 border-gray-200">DELETE</th>
                                            <th className="p-5 border-r-2 border-gray-200">NAME</th>
                                            <th className="p-5 border-r-2 border-gray-200">MAC</th>
                                            <th className="p-5 border-r-2 border-gray-200">UN. MED</th>
                                            <th className="p-5 border-r-2 border-gray-200">LATITUDE</th>
                                            <th className="p-5 border-r-2 border-gray-200">LONGITUDE</th>
                                            <th className="p-5 border-r-2 border-gray-200">STATUS</th>
                                        </tr>

                                    </thead>
                                    <tbody> 
                                        {data.map((sensor) => (
                                            <tr key={sensor.id} className="border-gray-200 border-b-2 hover:bg-sky-100">

                                                <td className="p-6 border-l-2 border-gray-200">
                                                        <FaEdit className="cursor-pointer text-emerald-700 duration-100 ease-in hover:scale-125" onClick={()=> update_sensor(sensor)} />
                                                </td>

                                                <td className="p-6 flex justify-center items-center border-l-2 border-gray-200">
                                                        <FaTrash className="cursor-pointer text-red-400 duration-100 ease-in hover:scale-125" onClick={() => delete_sensor(sensor.id)} />
                                                </td>

                                                <td className="p-5 border-l-2 border-gray-200">{sensor.sensor}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{sensor.mac_adress}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{sensor.unidade_med}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{sensor.latitude}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{sensor.longitude}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{sensor.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>


                        <ModalSensors className="self-center"
                            isOpen={modalOpen}
                            onClose={()=>setModalOpen(false)}
                            selectedSensor = {selectedSensor}
                            arrow = {arrow}
                            setArrow  = {setArrow}
                        />


                    </div>
                </section>
            </main>

            <Footer />
        </>
    )

}