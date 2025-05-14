import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiResetLeftFill } from "react-icons/ri";
import axios from "axios";

const FilterSensors = ({
    isFilterOpen,
    onFilterClose,
    originalDataFilter,
    dadosFilter,
    setDadosFilter,
    token,
}) => {
    if (!isFilterOpen) return null;

    const [isMacAdressOpen, setIsMacAdressOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isSensorOpen, setIsSensorOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [sensor, setSensor] = useState("");
    const [macAdress, setMacAdress] = useState("");

    function filterData() {
        try {
            const response = axios.get(`http://127.0.0.1:8000/api/sensores/?mac_adress=${macAdress}&status=${status}&sensor=${sensor}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setDadosFilter(response.data);
            console.log("Datah: ", data);
            
        } catch (error) {
            console.log(error)
        } 
    }

    
    return (
        <div className="flex justify-center items-center mt-[1vh]">
            <div className="flex justify-center items-center">
                <div className="w-[22vw] bg-teal-700 rounded-3xl p-6">
                    <h3 className="text-white text-xl">Filter per:</h3>
                    
                    <div className="bg-teal-600 mb-[4vh] mt-[1.5rem] p-[0.5rem] rounded-xl">

                        <div className="flex items-center justify-between">
                            <p className="text-white text-l">Sensors MAC Adress</p>
                            {isMacAdressOpen == true ? (
                                <RiArrowDropUpLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsMacAdressOpen(false)}></RiArrowDropUpLine>
                            ) : <RiArrowDropDownLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsMacAdressOpen(true)}></RiArrowDropDownLine>}

                        </div>
                        <div>
                            {isMacAdressOpen == true ? (
                                <div className="flex items-center justify-between mt-4 pb-1">
                                    <input placeholder="Type the ambient SLG" value={macAdress} onChange={(e) => setMacAdress(e.target.value)} type="text" className="bg-teal-500 rounded-[6px] p-1 w-[80%] text-white focus:outline-none"></input>
                                    <IoSend onClick={filterData} className="text-white mr-2 text-xl duration-200 easy-in-out hover:scale-125"></IoSend>

                                </div>
                            ) : null}
                        </div>
                    </div>
                        

                    <div className="bg-teal-600 mb-[4vh] mt-[1.5rem] p-[0.5rem] rounded-xl">

                        <div className="flex items-center justify-between">
                            <p className="text-white text-l">Sensors type</p>
                            {isSensorOpen == true ? (
                                <RiArrowDropUpLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsSensorOpen(false)}></RiArrowDropUpLine>
                            ) : <RiArrowDropDownLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsSensorOpen(true)}></RiArrowDropDownLine>}

                        </div>
                        <div>
                            {isSensorOpen == true ? (
                                <div className="flex items-center justify-between mt-4 pb-1">
                                    <input placeholder="Type the ambient description" value={sensor} onChange={(e) => setSensor(e.target.value)} type="text" className="bg-teal-500 rounded-[6px] p-1 w-[80%] text-white focus:outline-none"></input>
                                    <IoSend onClick={filterData} className="text-white mr-2 text-xl duration-200 easy-in-out hover:scale-125"></IoSend>

                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="bg-teal-600 mb-[4vh] mt-[1.5rem] p-[0.5rem] rounded-xl">

                        <div className="flex items-center justify-between">
                            <p className="text-white text-l">Sensors status</p>
                            {isStatusOpen == true ? (
                                <RiArrowDropUpLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsStatusOpen(false)}></RiArrowDropUpLine>
                            ) : <RiArrowDropDownLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsStatusOpen(true)}></RiArrowDropDownLine>}

                        </div>
                        <div>
                            {isStatusOpen == true ? (
                                <div className="flex items-center justify-between mt-4 pb-1">
                                    <input placeholder="Type the ambient description" value={status} onChange={(e) => setStatus(e.target.value)} type="text" className="bg-teal-500 rounded-[6px] p-1 w-[80%] text-white focus:outline-none"></input>
                                    <IoSend onClick={filterData} className="text-white mr-2 text-xl duration-200 easy-in-out hover:scale-125"></IoSend>

                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pl-1 mt-[1.5rem]">

                        <div className="flex items-center p-2 rounded-xl duration-150 ease-in-out hover:bg-teal-600 hover:scale-115 hover:ml-2" onClick={() => {
                            setDadosFilter(originalDataFilter);
                            setStatus("");
                            setMacAdress("");
                            setSensor("");
                        }}>
                            <RiResetLeftFill className="text-white text-2xl mr-2"></RiResetLeftFill>
                            <p className="text-[16px] text-white">Remove all filters</p>
                        </div>

                        <p className="text-white text-3xl cursor-pointer duration-100 easy-in-out hover:scale-125 pr-1" onClick={
                            () => {
                                onFilterClose();
                                setStatus("");
                            setMacAdress("");
                            setSensor("");
                            }}>x</p>

                    </div>
                    
                </div>
                
            </div>
        </div>
        
    )
}

export default FilterSensors