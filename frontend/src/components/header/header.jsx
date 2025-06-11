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
        <header className="ml-[6.5rem] bg-[#298287] p-[1rem] text-white flex items-center justify-center">
            <figure>
                <image
                >
                    
                </image>
            </figure>
        </header>
        
    )
}