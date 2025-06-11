import React from "react";
import { Link } from "react-router-dom";
import orbisense from "../../assets/logoOrbisense.png";
import { MdHistory, MdHomeFilled, MdPlace, MdOutlineSensors } from "react-icons/md";
import { IoBarChart, IoLogOut } from "react-icons/io5";

export default function Sidebar(){

    const liMenu = "pb-[1.5rem] pt-[1.5rem] w-full flex items-center justify-center hover:bg-[#298287] hover:text-white";
    const liMenuLogOut = "mt-[30vh] pb-[1.5rem] pt-[1.5rem] w-full flex items-center justify-center hover:bg-[#298287] hover:text-white";

    return(
        <aside className="h-full bg-white fixed z-50">

            <figure>
                <img 
                    className="p-[1rem] mb-[20%] h-full w-[6.5rem]"
                    src={orbisense}
                    alt="Logo da empresa">
                </img>
            </figure>

            <nav>
                <ul>
                    <li 
                    className={liMenu}>
                        <a>
                            < MdHomeFilled className="h-[2rem]  w-[2rem]" />
                        </a>
                    </li>

                    <li
                    className={liMenu}>
                        <a>
                            < MdOutlineSensors className="h-[2rem]  w-[2rem]" />
                        </a>
                    </li>

                    <li
                    className={liMenu}>
                        <a>
                            < MdPlace className="h-[2rem]  w-[2rem]" />
                        </a>
                    </li>

                    <li
                    className={liMenu}>
                        <a>
                            < MdHistory className="h-[2rem]  w-[2rem]" />
                        </a>
                    </li>

                    <li
                    className={liMenu}>
                        <a>
                            < IoBarChart className="h-[2rem]  w-[2rem]" />
                        </a>
                    </li>

                    <li
                    className={liMenuLogOut}>
                        <a>
                            < IoLogOut className="h-[2rem]  w-[2rem]" />
                        </a>
                    </li>
                    
                </ul>

            </nav>
        </aside>
    )

}