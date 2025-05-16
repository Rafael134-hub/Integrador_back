import React from "react";
import { Link } from "react-router-dom";
import potaxie from '../../assets/potaxie.png';

export default function Header(){

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
    }

    return(
        <header className="bg-teal-600 p-[1rem] text-white flex items-center justify-center">
            <div className="w-[94vw] flex items-center justify-between">
                <div className="title">
                    <img src={potaxie} className="w-[100%] h-[9vh]"></img>
                </div>

                <nav className=" w-[60vw] flex justify-between items-center text-xl">
                    <Link to={'/upload_ambients'}><p className="hover:text-teal-800">Importar Exel</p></Link>
                    <Link to={'/upload_sensores'}><p className="hover:text-teal-800">Importar Exel 2</p></Link>
                    <Link to={'/upload_historicos'}><p className="hover:text-teal-800">Importar Exel 3</p></Link>
                    <Link to={'/home'}><p className="hover:text-teal-800">Home</p></Link>
                    <Link to={'/sensores'}><p className="hover:text-teal-800">Sensores</p></Link>
                    <Link to={'/ambientes'}><p className="hover:text-teal-800">Ambientes</p></Link>
                    <Link to={'/historics'}><p className="hover:text-teal-800">Históricos</p></Link>
                    <Link to={'/'}><p className="hover:text-teal-800">Login</p></Link>
                </nav>
            </div>
        </header>
        
    )
}