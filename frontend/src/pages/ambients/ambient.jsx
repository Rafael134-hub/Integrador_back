import React, {useState, useEffect} from "react";
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaFilter} from 'react-icons/fa'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ModalAmbients from "../../modals/ambients/modal_ambient";
import FilterAmbients from "../../components/filter/filter_ambients/filter_ambient";

export default function Ambients(){

    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const token = localStorage.getItem('token');
    const [arrow, setArrow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterlOpen, setFilterlOpen] = useState(false);
    const [selectedAmbient, setSelectedAmbient] = useState(null);
    const [arrow2, setArrow2] = useState(false);;

    useEffect(() => {

        if (!token) return;
        console.log("Data: ", data);
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ambientes',
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

    const delete_ambient = async (id) => {
        if (window.confirm("Are u sure?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(data.filter((ambient) => { ambient.id !== id }))
                setArrow(!arrow)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const create_ambient = async(newAmbient)=>{
        console.log("New ambient: ", newAmbient)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ambientes',
                
                {   
                    sig: newAmbient.sig,
                    descricao: newAmbient.descricao,
                    ni: newAmbient.ni,
                    responsavel: newAmbient.responsavel
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Data insert was succesfull!", response.data)
            setData(...data, newAmbient)
            setModalOpen(false)
            setArrow(!arrow)
        } catch (error) {
            console.error(error)
        }

    }

    const update_ambient = (ambient)=>{
        setSelectedAmbient(ambient)
        setModalOpen(true)
    }


    return(
        <>
            <Header/>

            <main>
                <section>
                    <h1 className="text-[40px] font-bold text-center mt-[6vh] text-sky-600 mb-[8vh]">Ambients!</h1>

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

                                <FilterAmbients 
                                    isFilterOpen={filterlOpen}
                                    originalDataFilter = {originalData}
                                    dadosFilter = {data}
                                    setDadosFilter={setData}
                                    onFilterClose={()=>setFilterlOpen(false)}
                                />
                                
                            </div>

                            <div className="flex items-center justify-between w-[15.4vw] rounded-2xl p-2 duration-200 ease-in-out hover:bg-emerald-100 hover:scale-110" onClick={()=>{setModalOpen(true), setSelectedAmbient(null)}}>
                                <p className="text-xl hover:text-teal-900">Register new Ambient</p>
                                <FaPlus className="text-teal-700 text-2xl duration-150 ease-in-out hover:scale-120" />
                            </div>

                        </div>
                        
                    </div>
                    
                    <div className="mb-[12vh]">
                        <div className="flex justify-center items-center">
                            <div className="rounded-4xl">
                                <table className="w-[80vw]">
                                <thead className="border-b-2 text-[18px] font-normal text-white bg-teal-700">
            
                                        <tr>
                                            <th className="p-5 border-r-2 border-gray-200">EDIT</th>
                                            <th className="p-5 border-r-2 border-gray-200">DELETE</th>
                                            <th className="p-5 border-r-2 border-gray-200">SIG</th>
                                            <th className="p-5 border-r-2 border-gray-200">NI</th>
                                            <th className="p-5 border-r-2 border-gray-200">DESCRIPTON</th>
                                            <th className="p-5 border-r-2">OWNER</th>
                                        </tr>

                                    </thead>
                                    <tbody> 
                                        {data.map((ambient) => (
                                            <tr key={ambient.id} className="border-gray-200 border-b-2 hover:bg-sky-100">

                                                <td className="p-6 border-l-2 border-gray-200">
                                                        <FaEdit className="cursor-pointer text-emerald-700 duration-100 ease-in hover:scale-125" onClick={()=> update_ambient(ambient)} />
                                                </td>

                                                <td className="p-6 flex justify-center items-center border-l-2 border-gray-200">
                                                        <FaTrash className="cursor-pointer text-red-400 duration-100 ease-in hover:scale-125" onClick={() => delete_ambient(ambient.id)} />
                                                </td>

                                                <td className="p-5 border-l-2 border-gray-200">{ambient.sig}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{ambient.ni}</td>
                                                <td className="p-5 border-l-2 border-gray-200">{ambient.descricao}</td>
                                                <td className="p-5 border-l-2 border-r-2 border-gray-200">{ambient.responsavel}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>


                        <ModalAmbients className="self-center"
                            isOpen={modalOpen}
                            onClose={()=>setModalOpen(false)}
                            selectedAmbient = {selectedAmbient}
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