import React from "react";
import { Link } from "react-router-dom";
import potaxie from '../../assets/potaxie.png';

export default function Footer(){

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
    }

    return(
        <footer className="ml-[6.5rem] bg-[#298287] text-white flex items-center justify-center border-t-white">
            <p className="text-xl p-[2rem]">© 2025 - Orbisense All rights reserved</p>
        </footer>
        
    )
}