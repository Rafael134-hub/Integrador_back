import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiResetLeftFill } from "react-icons/ri";

const FilterAmbients = ({
    isFilterOpen,
    onFilterClose,
    originalDataFilter,
    setDadosFilter,
}) => {
    if (!isFilterOpen) return null;

    const [isNameOpen, setIsNameOpen] = useState(false);
    const [isIDOpen, setIsIDOpen] = useState(false);
    const [idContent, setIdContent] = useState("");
    const [nameContent, setNameContent] = useState("");

    function filterData() {
        let filteredData = originalDataFilter;
    
        if (idContent.trim() !== "") {
            filteredData = filteredData.filter((item) =>
                item.sig === idContent.trim()
            );
        }
    
        if (nameContent.trim() !== "") {
            filteredData = filteredData.filter((item) =>
                item.descricao.toLowerCase().includes(nameContent.toLowerCase().trim())
            );
        }
    
        setDadosFilter(filteredData);
    }

    
    return (
        <div className="flex justify-center items-center mt-[1vh]">
            <div className="flex justify-center items-center">
                <div className="w-[22vw] bg-teal-700 rounded-3xl p-6">
                    <h3 className="text-white text-xl">Filter per:</h3>
                    
                    <div className="bg-teal-600 mb-[4vh] mt-[1.5rem] p-[0.5rem] rounded-xl">

                        <div className="flex items-center justify-between">
                            <p className="text-white text-l">Ambient SIG</p>
                            {isIDOpen == true ? (
                                <RiArrowDropUpLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsIDOpen(false)}></RiArrowDropUpLine>
                            ) : <RiArrowDropDownLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsIDOpen(true)}></RiArrowDropDownLine>}

                        </div>
                        <div>
                            {isIDOpen == true ? (
                                <div className="flex items-center justify-between mt-4 pb-1">
                                    <input placeholder="Type the ambient SLG" value={idContent} onChange={(e) => setIdContent(e.target.value)} type="text" className="bg-teal-500 rounded-[6px] p-1 w-[80%] text-white focus:outline-none"></input>
                                    <IoSend onClick={filterData} className="text-white mr-2 text-xl duration-200 easy-in-out hover:scale-125"></IoSend>

                                </div>
                            ) : null}
                        </div>
                    </div>
                        

                    <div className="bg-teal-600 mb-[4vh] mt-[1.5rem] p-[0.5rem] rounded-xl">

                        <div className="flex items-center justify-between">
                            <p className="text-white text-l">Ambient Description</p>
                            {isNameOpen == true ? (
                                <RiArrowDropUpLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsNameOpen(false)}></RiArrowDropUpLine>
                            ) : <RiArrowDropDownLine className="text-white text-4xl duration-200 easy-in-out hover:scale-140" onClick={() => setIsNameOpen(true)}></RiArrowDropDownLine>}

                        </div>
                        <div>
                            {isNameOpen == true ? (
                                <div className="flex items-center justify-between mt-4 pb-1">
                                    <input placeholder="Type the ambient description" value={nameContent} onChange={(e) => setNameContent(e.target.value)} type="text" className="bg-teal-500 rounded-[6px] p-1 w-[80%] text-white focus:outline-none"></input>
                                    <IoSend onClick={filterData} className="text-white mr-2 text-xl duration-200 easy-in-out hover:scale-125"></IoSend>

                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pl-1 mt-[1.5rem]">

                        <div className="flex items-center p-2 rounded-xl duration-150 ease-in-out hover:bg-teal-600 hover:scale-115 hover:ml-2" onClick={() => {
                            setDadosFilter(originalDataFilter);
                            setNameContent("");
                            setIdContent("");
                        }}>
                            <RiResetLeftFill className="text-white text-2xl mr-2"></RiResetLeftFill>
                            <p className="text-[16px] text-white">Remove all filters</p>
                        </div>

                        <p className="text-white text-3xl cursor-pointer duration-100 easy-in-out hover:scale-125 pr-1" onClick={
                            () => {
                                onFilterClose();
                                setNameContent("");
                                setIdContent("");
                            }}>x</p>

                    </div>
                    
                </div>
                
            </div>
        </div>
        
    )
}

export default FilterAmbients