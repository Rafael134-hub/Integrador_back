import React, {useState, useEffect} from "react";
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaFilter} from 'react-icons/fa'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ModalHistorics from "../../modals/historics/modal_historic";
import FilterHistorics from "../../components/filter/filter_historics/filter_historic";

export default function Historic(){

    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const token = localStorage.getItem('token');
    const [arrow, setArrow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterlOpen, setFilterlOpen] = useState(false);
    const [selectedHistoric, setSelectedHistoric] = useState(null);
    const [sensores, setSensores] = useState([]);
    const [ambientes, setAmbientes] = useState([]);

    useEffect(() => {

        if (!token) return;
        console.log("Data: ", data);
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/historicos/',
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
    }, []);


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
                setSensores(response.data);
                console.log("Sensores: ", sensores);
    
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, []);


    useEffect(() => {

        if (!token) return;
        console.log("Data: ", data);
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ambientes/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setAmbientes(response.data);
                console.log("Ambientes: ", sensores);
    
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, []);
    

    const delete_historic = async (id) => {
        if (window.confirm("Are u sure?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/historico/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(data.filter((historic) => { historic.id !== id }))
                setArrow(!arrow)
            } catch (error) {
                console.error(error)
            }
        }
    }


    const export_historic = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/exportar/historicos', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob'  
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'historicos.xlsx'); 
            document.body.appendChild(link);
            link.click();
    
            link.remove();
        } catch (error) {
            console.error("Erro ao exportar histórico:", error);
        }
    };


    const update_historic = (historic)=>{
        setSelectedHistoric(historic)
        setModalOpen(true)
    }


    const get_name_sensor = (id_sensor) => {
        const sensor_selecionado = sensores.find(item => item.id === id_sensor);
        console.log(sensor_selecionado)
        return sensor_selecionado ? sensor_selecionado.sensor : "Sensor desconhecido";
    };


    const get_name_ambiente = (id_ambiente) => {
        const ambiente = ambientes.find(item => item.id === id_ambiente);
        console.log(ambiente)
        return ambiente ? ambiente.descricao : "Ambiente desconhecido";
    };


    return(
        <>
            <Header/>

            <main>
                <section>
                    <h1 className="text-[40px] font-bold text-center mt-[6vh] text-sky-600 mb-[8vh]">Historics!</h1>

                    <div className="flex items-center justify-center mb-[4vh]">
                        <div className="w-[90vw] flex items-center justify-between cursor-pointer">

                            <div>
                                
                                <div className="flex items-center justify-between w-[6.6vw] rounded-2xl p-3 duration-200 hover:bg-emerald-100 hover:scale-110 hover:ml-1" onClick={()=>{
                                    filterlOpen == false?
                                    setFilterlOpen(true)
                                    
                                    :setFilterlOpen(false);
                                
                                    }}>

                                    <FaFilter className="text-teal-700 text-2xl duration-150 ease-in-out hover:scale-115"></FaFilter>
                                    <p className="text-xl hover:text-teal-900">Filter</p>
                                </div>  

                                <FilterHistorics
                                    isFilterOpen={filterlOpen}
                                    originalDataFilter = {originalData}
                                    dadosFilter = {data}
                                    setDadosFilter={setData}
                                    onFilterClose={()=>setFilterlOpen(false)}
                                />
                                
                            </div>

                            <div className="flex items-center justify-between w-[15.4vw] rounded-2xl p-2 duration-200 ease-in-out hover:bg-emerald-100 hover:scale-110" onClick={()=>{setModalOpen(true), setSelectedHistoric(null)}}>
                                <p className="text-xl hover:text-teal-900">Register new Historic</p>
                                <FaPlus className="text-teal-700 text-2xl duration-150 ease-in-out hover:scale-120" />
                            </div>

                        </div>
                        
                    </div>
                    
                    <div className="pl-[5.5rem] mb-[1rem]">
                        <div className="p-2 text-center rounded-2xl bg-teal-900 text-white duration-200 cursor-pointer ease-in-out hover:scale-110 w-[10rem]" onClick={export_historic}>
                            <h1>Exportar</h1>
                        </div>
                    </div>
                    
                    <div className="mb-[12vh]">
                        <div className="flex justify-center items-center">
                            <div className="rounded-4xl">
                                <table className="w-[90vw]">
                                <thead className="border-b-2 text-[18px] font-normal text-white bg-teal-700">
            
                                        <tr>
                                            <th className="p-5 border-r-2 border-gray-200">EDIT</th>
                                            <th className="p-5 border-r-2 border-gray-200">DELETE</th>
                                            <th className="p-5 border-r-2 border-gray-200">SENSOR</th>
                                            <th className="p-5 border-r-2 border-gray-200">AMBIENT</th>
                                            <th className="p-5 border-r-2 border-gray-200">TIMESTAMP</th>
                                            <th className="p-5 border-r-2 border-gray-200">VALUE</th>
                                        </tr>

                                    </thead>
                                    <tbody> 
                                        {data.map((historic) => (
                                            <tr key={historic.id} className="border-gray-200 border-b-2 hover:bg-sky-100">

                                                <td className="p-6 border-l-2 border-gray-200">
                                                        <FaEdit className="cursor-pointer text-emerald-700 duration-100 ease-in hover:scale-125" onClick={()=> update_historic(historic)} />
                                                </td>

                                                <td className="p-6 flex justify-center items-center border-l-2 border-gray-200">
                                                        <FaTrash className="cursor-pointer text-red-400 duration-100 ease-in hover:scale-125" onClick={() => delete_historic(historic.id)} />
                                                </td>

                                                <td className="p-5 border-l-2 border-gray-200">{get_name_sensor(historic.id_sensor)}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{get_name_ambiente(historic.id_ambiente)}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{historic.timestamp}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{historic.valor}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>


                        <ModalHistorics className="self-center"
                            isOpen={modalOpen}
                            onClose={()=>setModalOpen(false)}
                            selectedHistoric = {selectedHistoric}
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